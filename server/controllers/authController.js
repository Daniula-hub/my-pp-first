const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(500)
        .send("Bad Request, Email and Password were not sent in the request");
    }
    let result = await db.auth.check_email(email);
    if (result.lenght > 0) {
      return res.status(409).send("Email Taken");
    }
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password);
    const user = await db.auth.register_user(email, password);
    const cart = await db.cart.create_cart(user[0].user_id, "cart");
    if (cart.lenght <= 0) {
      return res.status(404).send('Cart not found');
    }
    delete user.password;
    user.cart_id = cart[0].cart_id;
    const data = { 
      user: user,
      cart: cart
    }
    req.session.user=user[0];
    req.session.user.cart_id= cart[0].cart_id;
    req.session.cart=cart[0];
    return res.status(200).send(data);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(500)
        .send("Bad Request, Email and Password were not sent in the request");
    }
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password);
    const user = await db.auth.get_user(email, password);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    const cart = await db.cart.get_cart(user[0].user_id);
    if(cart.length <= 0 ){
      return res.status(404).send("Cart Not Found");
    };
    delete user.password;
    console.log('ayyyy', cart);
    user.cart_id = cart[0].cart_id;
    const data = { 
      user: user,
      cart: cart
    }
    req.session.user=user[0];
    req.session.user.cart_id= cart[0].cart_id;
    req.session.cart=cart[0];
    console.log('uuuyyyy', req.session);
    
    return res.status(200).send(data);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password);
    const user = await db.auth.get_user(email, password);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    delete user.password;
    return res.status(200).send(user);
  },
};
