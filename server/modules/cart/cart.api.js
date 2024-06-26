const mongoose = require("mongoose");
const { isBuyer } = require("../../middleware/authorization");
const {
  addItemToCartValidation,
  updateCartValidation,
} = require("./cart.validation");
const productController = require("../products/product.controller");
const cartController = require("./cart.controller");
const cartModel = require("./cart.model");
const isValidMongoId = require("../../middleware/validateMongoID");
const productModel = require("../products/product.model");
const validateReqBody = require("../../middleware/reqBodyValidation");

const router = require("express").Router();

router.post("/add", isBuyer, async (req, res, next) => {
  try {
    const cartData = req.body;
    const validateData = await addItemToCartValidation.validate(cartData);
    const isValidMongoId = mongoose.isValidObjectId(cartData.productId);
    if (!isValidMongoId) throw new Error("Invalid Product ID");
    const product = await productController.findId({ id: cartData.productId });
    if (!product) throw new Error("Product not found!");
    if (cartData.orderQuantity > product.availableQuantity)
      throw new Error("Order  quantity exceeds available quantity.");

    //buyer cannot add cart twice in product after doing one time. buyer should go to add to cart to increase card
    const cartItem = await cartModel.findOne({
      buyerId: req.loggedInUserId,
      productId: cartData.productId,
    });
    // if (cartItem) throw new Error("This item already in your cart.");
    if (cartItem) {
      return res.status(409).send({
        message:
          "Item is already added to cart. Try updating quantity from cart.",
      });
    }
    // const createCart = await cartController.add(validateData);
    const createCart = await cartModel.create({
      buyerId: req.loggedInUserId,
      productId: cartData.productId,
      orderQuantity: cartData.orderQuantity,
    });
    res.json({
      message: "Item is added to cart successfully",
      data: createCart,
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/clear", isBuyer, async (req, res, next) => {
  try {
    const loggedInUserId = req.loggedInUserId;
    const deleteCart = await cartModel.deleteMany({ buyerId: loggedInUserId });
    res.json({ message: "Cart is deleted successfully", data: deleteCart });
  } catch (e) {
    next(e);
  }
});

//-------delete cart by id-------
router.delete(
  "/delete/:id",
  isBuyer,
  isValidMongoId,
  async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await productController.findId({ id: productId });
      if (!product) {
        return res.status(401).json({ message: "Product does not exist" });
      }
      const deletedCart = await cartModel.deleteOne({
        buyerId: req.loggedInUserId,
        productId: productId,
      });
      res.json({ message: "Cart is deleted successfully", deletedCart });
    } catch (e) {
      next(e);
    }
  }
);

//----------cart increase and decrease ---------
router.put(
  "/edit/:id",
  isBuyer,
  isValidMongoId,
  validateReqBody(updateCartValidation),
  async (req, res, next) => {
    try {
      //extract action form req.body
      const actionData = req.body;

      //find product
      const productId = req.params.id;
      const buyerId = req.loggedInUserId;
      const product = await productController.findId({ id: productId });
      if (!product) {
        return res.status(400).send("Product does not exits");
      }
      const productAvailableQuantity = product?.availableQuantity;
      //find cart
      const cartItem = await cartModel.findOne({
        buyerId: buyerId,
        productId: productId,
      });

      //if not cart item, throw error
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item does not Exists" });
      }
      //previous ordered quantity from cart item
      let previousOrderedQuantity = cartItem.orderQuantity;

      let newOrderedQuantity;

      if (actionData.action === "inc") {
        newOrderedQuantity = previousOrderedQuantity + 1;
      } else {
        newOrderedQuantity = previousOrderedQuantity - 1;
      }

      if (newOrderedQuantity < 1) {
        return res
          .status(403)
          .json({ message: "Order quantity cannot be zero" });
      }
      if (newOrderedQuantity > productAvailableQuantity) {
        return res
          .status(403)
          .json({ message: "Product reached available quantity" });
      }
      // update cart item with new ordered quantity
      const incOrDecQuantity = await cartModel.updateOne(
        {
          buyerId,
          productId,
        },
        { orderQuantity: newOrderedQuantity }
      );
      res.json({
        message: "Cart is edited successfully",
        data: incOrDecQuantity,
      });
    } catch (e) {
      next(e);
    }
  }
);

//--------------view all carts including pagination-------
router.get("/list", isBuyer, async (req, res) => {
  // extract buyerId from req.loggedInUserId
  const buyerId = req.loggedInUserId;

  const cartData = await cartModel.aggregate([
    {
      $match: {
        buyerId: buyerId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $project: {
        name: { $first: "$productDetails.name" },
        brand: { $first: "$productDetails.brand" },
        unitPrice: { $first: "$productDetails.price" },
        image: { $first: "$productDetails.image" },
        orderQuantity: 1,
        productId: 1,
      },
    },
    {
      $project: {
        name: 1,
        brand: 1,
        unitPrice: 1,
        orderQuantity: 1,
        productId: 1,
        subTotal: { $multiply: ["$unitPrice", "$orderQuantity"] },
        image: 1,
      },
    },
  ]);
  let allProductSubTotal = 0;
  let discountPercent = 0; // 5% flat discount
  let discountAmount = 0;
  let grandTotal = 0;
  cartData.forEach((cart) => {
    allProductSubTotal = allProductSubTotal + cart.subTotal;
  });
  discountAmount = (0 / 100) * allProductSubTotal;
  grandTotal = allProductSubTotal - discountAmount;
  return res.status(200).send({
    message: "success",
    cartData: cartData,
    orderSummary: {
      allProductSubTotal,
      discountAmount: discountAmount.toFixed(2), // to solve 0.1000000002 like problems
      grandTotal,
    },
  });
});

//-----item count------
router.get("/itemCount", isBuyer, async (req, res, next) => {
  try {
    const loggedInUserId = req.loggedInUserId;

    const cartItemCount = await cartModel
      .find({ buyerId: loggedInUserId })
      .countDocuments();
    return res.json({ message: "success", cartItemCount });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
