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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await db.auth.register_user(email, hash);
    const cart = await db.cart.create_cart(user[0].user_id, "cart");
    if (cart.lenght > 0) {
      return res.status(500).send(cart);
    }
    delete user.password;
    req.session.user = user;
    req.session.user.cart_id = cart.cart_id;
    return res.status(200).send(user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(500)
        .send("Bad Request, Email and Password were not sent in the request");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await db.auth.get_user(email, hash);
    if (!user) {
      return res.status(401).send("User Not Found");
    }
    const [cart] = await db.cart.get_cart(user.user_id);
    delete user.password;
    req.session.user = user;
    req.session.user.cart_id = cart.cart_id;
    return res.status(200).send(user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await db.auth.get_user(email, hash);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    delete user.password;
    return res.status(200).send(user);
  },
};
