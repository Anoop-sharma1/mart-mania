const express = require("express");
const blogController = require("../../controller/admin/blogController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const { blogImgResize, uploadBlogPhoto } = require("../../middlewares/uploadImage");
const blogValidator = require("../../validators/admin/blogValidator");
const multer = require('multer');
const multerService = require("../../services/multerService");

const router = express.Router();

router.get("/:id",
  blogValidator.getBlogValidation,
  blogController.getBlog
);

router.get("/",
  blogController.getAllBlogs
);

router.post("/",
    authMiddleware,
    isAdmin,
    blogValidator.createBlogValidation,
    blogController.createBlog
);

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  blogValidator.uploadBlogValidation,
  multer(multerService.multerBlogImage).array("images", 2),
  blogController.uploadImages
);

router.put("/:id",
    authMiddleware,
    isAdmin,
    blogValidator.updateBlogValidation,
    blogController.updateBlog
);

router.delete("/:id",
  authMiddleware,
  blogValidator.deleteBlogValidation,
  isAdmin, blogController.deleteBlog
);

module.exports = router;
