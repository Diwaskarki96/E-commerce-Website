const router = require("express").Router();
const productController = require("./product.controller");
const {
  productValidation,
  paginationValidation,
} = require("./product.validation");
const { isSeller, isBuyer, isUser } = require("../../middleware/authorization");
const isValidMongoId = require("../../middleware/validateMongoID");
const productModel = require("./product.model");
const validateReqBody = require("../../middleware/reqBodyValidation");

router.get("/all", async (req, res, next) => {
  try {
    const allProducts = await productController.all();
    res.json({ message: "success", data: allProducts });
  } catch (e) {
    next(e);
  }
});

router.post("/add", isSeller, async (req, res, next) => {
  try {
    const newProduct = req.body;
    const validateData = await productValidation.validate(newProduct);
    const loggedInUserId = req.loggedInUserId;
    newProduct.sellerId = loggedInUserId;
    const product = await productController.add(validateData);
    res.json({ message: "Product is added successfully", data: product });
  } catch (e) {
    next(e);
  }
});

router.get("/details/:id", isUser, isValidMongoId, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productController.findId({ id: productId });
    if (!product) throw new Error("No Product Found");
    res.json({ message: "Success", data: product });
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/delete/:id",
  isSeller,
  isValidMongoId,
  async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await productController.findId({ id: productId });
      if (!product) throw new Error("Product does not exist");

      const sellerId = product.sellerId;
      const loggedInUserId = req.loggedInUserId;

      const isOwnerOfProduct = sellerId.equals(loggedInUserId);
      if (!isOwnerOfProduct)
        throw new Error("You are not the owner of this product");
      const deleteProduct = await productController.remove({ id: productId });
      res.json({
        message: "Product is deleted successfully",
        data: deleteProduct,
      });
    } catch (e) {
      next(e);
    }
  }
);

//edit
router.put("/edit/:id", isSeller, isValidMongoId, async (req, res, next) => {
  try {
    const data = req.body;
    const validateProduct = await productValidation.validate(data);
    const productId = req.params.id;
    const product = await productController.findId({ id: productId });
    if (!product) throw new Error("Product Does Not Exist!");

    const sellerId = product.sellerId;
    const loggedInUserId = req.loggedInUserId;

    const isOwnerOfProduct = sellerId.equals(loggedInUserId);
    if (!isOwnerOfProduct)
      throw new Error("You are not the owner of this product");
    const updateProduct = await productController.updateById(
      productId,
      validateProduct,
      { new: true }
    );
    res.json({ message: "Product is edit successfully", data: updateProduct });
  } catch (e) {
    next(e);
  }
});

//list all product by buyer
router.post(
  "/productList/buyer",
  isBuyer,
  validateReqBody(paginationValidation),
  async (req, res, next) => {
    try {
      const { limit, page, searchText } = req.body;
      const skip = (page - 1) * limit;
      let match = {};
      if (searchText) {
        match = { name: { $regex: searchText, $options: "i" } };
      }

      const product = await productModel.aggregate([
        { $match: match },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            name: 1,
            band: 1,
            price: 1,
            category: 1,
            freeShipping: 1,
            description: { $substr: ["$description", 0, 200] },
            availableQuantity: 1,
            image: 1,
          },
        },
      ]);
      const totalProduct = await productModel.find(match).countDocuments();
      const totalPage = Math.ceil(totalProduct / limit);
      res.json({ message: "success", data: product, totalPage });
    } catch (e) {
      next(e);
    }
  }
);

//list all product by seller
router.post(
  "/productList/seller",
  isSeller,
  validateReqBody(paginationValidation),
  async (req, res, next) => {
    try {
      const { limit, page } = req.body;
      const skip = (page - 1) * limit;
      const allProducts = await productModel.aggregate([
        { $match: { sellerId: req.loggedInUserId } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            name: 1,
            brand: 1,
            price: 1,
            category: 1,
            freeShipping: 1,
            availableQuanity: 1,
            description: { $substr: ["$description", 0, 200] },
            image: 1,
          },
        },
      ]);
      const totalProduct = await productModel
        .find({ sellerId: req.loggedInUserId })
        .countDocuments();
      const totalPage = Math.ceil(totalProduct / limit);
      res.json({ message: "success", data: allProducts, totalPage });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
