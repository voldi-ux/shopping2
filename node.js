const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const SignInRoutes = require("./routes/signIn");
const ShopRoutes = require("./routes/shop");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const port = process.env.PORT || 4000;
const stripe = require("stripe")(process.env.STRIPE_KEY);

const MONGODB_URI = "mongodb://127.0.0.1:27017/clothingShop";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,PATCH,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.use(SignInRoutes.router);
app.use(ShopRoutes.router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, resp, next) => {
    resp
      .status(200)
      .sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.post("/payment", (req, resp, next) => {
  const {
    amount,
    token: { id },
  } = req.body;

  const body = {
    source: id,
    amount: amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeSucess) => {
    if (stripeErr) {
      return resp.status(500).send({ message: stripeErr });
    }
    return resp.status(201).send({ message: stripeSucess });
  });
});
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
