const express = require("express");
const blogCategoryValidator = require("../../validators/admin/blogCategoryValidator");
const BlogCategory = require("../../controller/admin/blogCategoryController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("/:id", BlogCategory.getCategory);

router.get("/", BlogCategory.getallCategory);

router.post("/",
    authMiddleware,
    isAdmin,
    blogCategoryValidator.createBlogCategoryValidation,
    BlogCategory.createCategory
);

router.put("/:id",
    authMiddleware,
    isAdmin,
    blogCategoryValidator.createBlogCategoryValidation,
    BlogCategory.updateCategory
);

router.delete("/:id", authMiddleware, isAdmin, BlogCategory.deleteCategory);

module.exports = router;
