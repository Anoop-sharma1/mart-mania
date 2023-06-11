const express = require("express");
const productCategoryController  = require("../controller/productCategoryController");

const router = express.Router();

router.get("/:id",
  productCategoryController.getCategory
);

router.get("/",
  productCategoryController.getallCategory
);

module.exports = router;
