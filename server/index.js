require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./modules/users/user.api");
const productRouter = require("./modules/products/product.api");
const cartRouter = require("./modules/cart/cart.api");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is connected...");
});

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.get("/", (req, res) => {
  res.json({ msg: "Api is working" });
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
