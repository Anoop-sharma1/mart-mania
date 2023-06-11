const Category = require("../../models/prodcategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    return res.status(200).json({
      status: true,
      message: "Category created successfully",
      data: newCategory,
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(400).json({
        status: false,
        message: "Category not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category updated successfully!",
      data: updatedCategory,
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(400).json({
        status: false,
        message: "Category not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully!",
      data: deletedCategory,
    });

  } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data: {}
      });
    }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaCategory = await Category.findById(id);

    if(!getaCategory){
      return res.status(400).json({
        status: false,
        message: "Category not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category retrieved successfully!",
      data :  getaCategory,
    });
  
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    
    if (getallCategory.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Categories not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Categories retrieved successfully!",
      data : getallCategory,
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
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
