// imports
require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

// controllers
const authCtrl = require("./controllers/authController");
const exerciseCtrl = require("./controllers/exerciseController");
const cartCtrl = require("./controllers/cartController");
const emailCtrl = require("./controllers/emailController");


// app instance created
const app = express();

// database connection
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// top level middleware

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(express.json());
// app.use(cors())
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// endpoints
// auth
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);
app.get("/auth/getUser", authCtrl.getUser);

// exercises
app.get("/api/exercises", exerciseCtrl.getExercises);

// cart
app.get("/api/cart", cartCtrl.getCart);
app.get("/api/futureExercises/:cart_id", cartCtrl.getCart);
app.post("/api/cart/:exercise_id", cartCtrl.addToCart);// ej: req.params.exercise_id
app.post("/api/createFutureExercises", cartCtrl.createFutureExercises);
app.post("/api/executePayment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.program_name
          },
          unit_amount: req.body.price
        },
        quantity: 1
      }],
      success_url: `${process.env.SERVER_URL}/home`,
      cancel_url: `${process.env.SERVER_URL}/home`
    })
    res.json({url: session.url})
  } catch (error) {
    console.log("Llegue al error: ", error);
    res.status(500).json({ error: error.message})
  }
});
app.delete("/api/cart/:exercise_id", cartCtrl.deleteItemFromCart);

//NODEMAILER
app.post('/sendEmail', emailCtrl.sendEmail)

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`)
);
