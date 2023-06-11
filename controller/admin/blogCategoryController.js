const Category = require("../../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {

    const newCategory = await Category.create(req.body);

    return res.status(200).json({
      status: true,
      message: "Blog category created successfully!",
      data : newCategory
    });

  } catch (error) {

    return res.status(400).json({
      status: true,
      message: `${error.message}`,
      data : {}
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
      return res.status(401).json({
        status: false,
        message: "Blog category not found!",
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog category updated successfully!",
      data : updatedCategory
    });

  } catch (error) {

    return res.status(400).json({
      status: true,
      message: `${error.message}`,
      data : {}
    });

  }
});

const deleteCategory = asyncHandler(async (req, res) => {

  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(401).json({
        status: false,
        message: "Blog category not found!",
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog category deleted successfully!",
      data : deletedCategory
    });

  } catch (error) {

    return res.status(400).json({
      status: true,
      message: `${error.message}`,
      data : {}
    });
  }

});

const getCategory = asyncHandler(async (req, res) => {

  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaCategory = await Category.findById(id);
    
    if (!getaCategory) {
      return res.status(401).json({
        status: false,
        message: "Blog category not found!",
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog category retreived successfully!",
      data : getaCategory
    });

  } catch (error) {

    return res.status(400).json({
      status: true,
      message: `${error.message}`,
      data : {}
    });
  }
});

const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    
    if (getallCategory.length === 0) {
      return res.status(401).json({
        status: false,
        message: "Blog categories not found!",
        data : {}
      });
    }
    
    return res.status(200).json({
      status: true,
      message: "All Blog categories retreived successfully!",
      data : getallCategory
    });

  } catch (error) {
    
    return res.status(400).json({
      status: true,
      message: `${error.message}`,
      data : {}
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
