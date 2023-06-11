const express = require("express");
const productController = require("../../controller/admin/productController");
const { isAdmin, authMiddleware } = require("../../middlewares/authMiddleware");
const productValidator = require("../../validators/admin/productValidator");
const router = express.Router();

router.post("/",
  authMiddleware,
  isAdmin,
  productValidator.createProductValidation,
  productController.createProduct
);

router.get("/:id",
  authMiddleware,
  isAdmin,
  productValidator.getProductByIdValidation,
  productController.getaProduct
);

router.put("/:id",
  authMiddleware,
  isAdmin,
  productController.updateProduct
);

router.delete("/:id",
  authMiddleware,
  isAdmin,
  productValidator.getProductByIdValidation,
  productController.deleteProduct
);

router.get("/",
  authMiddleware,
  isAdmin,
  productController.getAllProduct
);

module.exports = router;
