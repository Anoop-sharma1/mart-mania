const express = require("express");
const productCategotyController = require("../../controller/admin/productCategoryController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const productCateogryValidator = require("../../validators/admin/productCategoryValidator")

const router = express.Router();

router.post("/",
  authMiddleware,
  isAdmin,
  productCateogryValidator.createProductCategoryValidation,
  productCategotyController.createCategory
);

router.put("/:id",
  authMiddleware,
  isAdmin,
  productCateogryValidator.updateProductCategoryValidation,
  productCategotyController.updateCategory
);

router.delete("/:id",
  authMiddleware,
  isAdmin,
  productCateogryValidator.getProductCategoryByIdValidation,
  productCategotyController.deleteCategory
);

router.get("/:id",
  authMiddleware,
  isAdmin,
  productCateogryValidator.getProductCategoryByIdValidation,
  productCategotyController.getCategory
);

router.get("/",
  authMiddleware,
  isAdmin,
  productCategotyController.getallCategory
);

module.exports = router;
