const BlogModel = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getBlog = await BlogModel.findById(id)
      .populate("likes")
      .populate("dislikes");

    if (!getBlog) {
      return res.status(400).json({
        status: false,
        message: "Blog not found!",
        data: {}
      })
    }

    const updateViews = await BlogModel.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Blog retrieved successfully!",
      data: getBlog,
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await BlogModel.find();

    if (getBlogs.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No blogs found!",
        data: {}
      })
    }

    return res.status(200).json({
      status: true,
      message: "All blogs retrieved successfully!",
      data: getBlogs
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const liketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  try {
    // Find the blog which you want to be liked
    const blog = await BlogModel.findById(blogId);

    if(!blog){
      return res.status(400).json({
        status: false,
        message: "Blog not found!",
        data: {}
      })
    }
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;

    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyDisliked) {
      const blog = await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: "Blog disliked removedsuccessfully!",
        data: blog,
      });
    }
    if (isLiked) {
      const blog = await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: "Blog liked removed successfully!",
        data: blog,
      });
    } else {
      const blog = await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: "Blog liked successfully!",
        data: blog,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog which you want to be disliked
  const blog = await BlogModel.findById(blogId);

  if (!blog) { 
    return res.status(400).json({
      status: false,
      message: "Blog not found!",
      data: {}
    });
  }
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyLiked) {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    
    return res.status(200).json({
      status: true,
      message: "Blog liked removed successfully!",
      data: blog,
    });
  }
  if (isDisLiked) {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    
    return res.status(200).json({
      status: true,
      message: "Blog disliked removed successfully!",
      data: blog,
    });

  } else {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    
    return res.status(200).json({
      status: true,
      message: "Blog disliked successfully!",
      data: blog,
    });
  }
});

module.exports = {
  getBlog,
  getAllBlogs,
  liketheBlog,
  disliketheBlog,
};
