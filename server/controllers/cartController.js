module.exports = {
  getCart: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    if (!user) {
      console.log(user);
      return res.status(404).send("User not logged in");
    }
    db.cart
      .get_cart_items(user.cart_id)
      .then((cartExercises) => {
        res.status(200).send(cartExercises);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  addToCart: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const { exercise_id } = req.params;
    if (!user) {
      return res.status(500).send("User not logged in");
    }
    db.cart
      .add_to_cart(user.cart_id, exercise_id)
      .then(() => {
        res.sendStatus(200);
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

  createFutureExercises: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const cart_type = "future_exercises";
    let cart_id = undefined;
    const validateCart = db.cart.validate_cart(user.user_id, cart_type); // checks if there is a cart for future exercise//
    if (validateCart.length <= 0) {
      cart_id = db.cart.create_cart(user.user_id, cart_type); //creates new cart for future exercise //
      if (!cart_id) {
        return res
          .status(500)
          .send("Cart for Future Exercises could not be created");
      }
    }
    const { exercise } = req.params;
    const addEx = db.cart.add_exercise_future_exercises_cart(
      cart_id,
      exercise.exercise_name,
      exercise.exercise_id,
      exercise.quantity
    );
    if (addEx.lenght <= 0) {
      return res.status(500).send("Could not add Future Exercise");
    }
    return res.status(200).send(addEx);
  },
};
