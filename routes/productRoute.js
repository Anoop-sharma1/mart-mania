const express = require("express");
const productController = require("../controller/productController");
const productValidator = require("../validators/productValidator");

const router = express.Router();

router.get("/:id",
productValidator.getProductByID,
  productController.getaProduct
);

router.get("/",
  productController.getAllProduct
);

module.exports = router;
