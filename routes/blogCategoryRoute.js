const express = require("express");
const BlogCategoryController = require("../controller/blogCategoryController");

const router = express.Router();

router.get("/:id", BlogCategoryController.getCategory);

router.get("/", BlogCategoryController.getallCategory);

module.exports = router;
