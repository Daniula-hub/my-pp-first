module.exports = {
  getCart: async (req, res) => {
    const db = req.app.get("db");
    const { user, cart } = req.session;
    if (!user) {
      return res.status(404).send("User not logged in");
    }

    if(!cart){
      return res.status(404).send("Cart Not Found");
    }
    const {cart_id} = req.params;
    const cartItems = await db.cart.get_cart_items(cart_id ? cart_id : user.cart_id);
     if(cartItems.length <= 0){
      return res.status(404).send("Items not found");
     }
     return res.status(200).send(cartItems);
  },

  addToCart: async (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    if (!user) {
      return res.status(500).send("User not logged in");
    }
    const items = await db.cart.get_cart_items(user.cart_id);
    const { exercise_id } = req.params;
    if(items.find(item => item.exercise_id == exercise_id)){
      return res.status(500).send('This exercise was already added to the cart!')
    }
    db.cart.add_to_cart(user.cart_id, exercise_id)
      .then((cartItems) => {
        res.status(200).send(cartItems);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  deleteItemFromCart: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const { exercise_id } = req.params;
    if (!user) {
      return res.status(500).send("User not logged in");
    }
    db.cart
      .delete_item_from_cart(user.cart_id, exercise_id)
      .then((cartExercises) => {
        res.status(200).send(cartExercises);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  createFutureExercises: async (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    if (!user) {
      return res.status(500).send("User not logged in");
    }
    const cart_type = "future_exercises";
    let cart_id = await db.cart.get_cartId_by_type(user.user_id, cart_type); // checks if there is a cart for future exercise//
    if (cart_id.length <= 0) {
      cart_id = await db.cart.create_cart(user.user_id, cart_type); //creates new cart for future exercise //
      if (!cart_id) {
        return res.status(500).send("Cart for Future Exercises could not be created");
      }
    }
    cart_id = cart_id[0]?.cart_id; //Extracts cart_id from the result of get_cartId_by_type
    const { exercise } = req.body;
    if (!exercise) {
      return res.status(404).send("Exercise not found.");
    }
    const exerciseExists = await db.cart.validate_future_exercises(cart_id, exercise.exercise_id);
    if (exerciseExists.length > 0) {
      return res.status(500).send("Exercise already exists in your Save for Later Cart.");
    }
    const addEx = await db.cart.future_exercises_cart(cart_id, exercise.exercise_id);
    if (addEx.length <= 0) {
      return res.status(500).send("Could not add Future Exercise");
    }
    return res.status(200).send(addEx);
  },
};