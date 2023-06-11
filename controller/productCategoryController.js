const CategoryModel = require("../models/prodcategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId.js");

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  
  try {
    const getaCategory = await CategoryModel.findById(id);
    if (!getaCategory) {
      return res.status(400).json({
        status:false,
        message: "Category not found!",
        data : {}
      });
    }
    
    return res.status(200).json({
      status: true,
      message: "Category retrived successfully!",
      data: getaCategory,
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data:{}
    });
  }
});

const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await CategoryModel.find();
    
    if (getallCategory.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Category not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category retrived successfully!",
      data: getallCategory,
    });

  } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data:{}
      });
  }
});

module.exports = {
  getCategory,
  getallCategory,
};
