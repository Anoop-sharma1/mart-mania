const Category = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaCategory = await Category.findById(id);
    if (!getaCategory) return res.status(404).json({
      status: false,
      message: "Category not found!",
      data: {}
    });

    return res.status(200).json({
      status: true,
      message: "Category retrieved successfully!",
      data: getaCategory,
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
      return res.status(404).json({
        status: false,
        message: "Category not found!",
        data: {}
      });
    }

    return res.status(200).json({
      staus: true,
      message: "Category retrieved successfully!",
      data: getallCategory,
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
  getCategory,
  getallCategory,
};
