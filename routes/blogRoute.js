const express = require("express");
const blogController = require("../controller/blogController");
const blogValidator = require("../validators/blogValidator");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.put("/like",
  authMiddleware,
  blogValidator.likeDislikeBlog,
  blogController.liketheBlog
);

router.put("/dislike",
  authMiddleware,
  blogValidator.likeDislikeBlog,
  blogController.disliketheBlog
);

router.get("/:id",
  blogValidator.getBlogById,
  blogController.getBlog
);

router.get("/",
  blogController.getAllBlogs
);

module.exports = router;
