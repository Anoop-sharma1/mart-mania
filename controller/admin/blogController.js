const Blog = require("../../models/blogModel");
const BlogCategory = require("../../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createBlog = asyncHandler(async (req, res) => {
    try {

        const { category } = req.body;

        const blogCategoryModel = await BlogCategory.findOne({ _id: category });
        
        if (!blogCategoryModel) {
            return res.status(400).json({
                status: false,
                message: "Blog category not found",
                data: {}
            });
        }

        req.body.category = blogCategoryModel.title;

        const newBlog = await Blog.create(req.body);

        return res.status(201).json({
            status: true,
            message: "Blog created successfully!",
            data: newBlog
        });
    } catch (error) {
        return res.status(400).json({
            status: true,
            message: error.message,
            data: {}
        });
    }
});

const updateBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;

    validateMongoDbId(id);

    try {

        const { category } = req.body;

        const blogCategoryModel = await BlogCategory.findOne({ _id: category });

        if (!blogCategoryModel) {
            return res.status(400).json({
                status: false,
                message: "Blog category not found",
                data: {}
            });
        }

        req.body.category = blogCategoryModel.title;

        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if(!updateBlog) {
            return res.status(400).json({
                status: false,
                message: "Blog not found",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Blog updated successfully!",
            data: updateBlog
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data : {}
        });
    }
});

const getBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {

        const getBlog = await Blog.findById(id)
            .populate("likes")
            .populate("dislikes");
        
        if(!getBlog) {
            return res.status(400).json({
                status: false,
                message: "Blog not found!",
                data: {}
            });
        }
            
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            { new: true }
        );

        return res.status(200).json({
            status: true,
            message: "Blog found successfully!",
            data: updateViews
        });

    } catch (error) {
        throw new Error(error);
    }

});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getBlogs = await Blog.find();

        if (getBlogs.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Blogs not found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Blogs found successfully!",
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

const deleteBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return res.status(400).json({
                status: false,
                message: "Blog not found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Blog deleted successfully!",
            data: deleteBlog
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const uploadImages = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        
        if (!req.files) { 
            return res.status(400).json({
                status: false,
                message: "Please upoad images!, Field Name : images",
                data: {}
            });
        }

        const findBlog = await Blog.findByIdAndUpdate(
            id,
            {
                images: req.files.map((file) => {
                    return "images/admin/blogs/" + file.filename;
                }),
            },
            {
                new: true,
            }
        );

        if (!findBlog) {
            return res.status(400).json({
                status: false,
                message: "Blog not found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Blog images uploaded successfully!",
            data : findBlog
        });

    } catch (error) {

        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});
  
module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    uploadImages,
    deleteBlog
};
