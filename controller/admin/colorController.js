const Color = require("../../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createColor = asyncHandler(async (req, res) => {
  
  try {
    const newColor = await Color.create(req.body);

    return res.status(200).json({
      status: true,
      message: "Color created successfully",
      data : newColor,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const updateColor = asyncHandler(async (req, res) => {

  const { id } = req.params;

  validateMongoDbId(id);

  try {

    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedColor) {
      return res.status(404).json({
        status: false,
        message: "Color not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Color updated successfully!",
      data: updatedColor,
    });

  } catch (error) {
    
    return res.status(500).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deletedColor = await Color.findByIdAndDelete(id);

    if (!deletedColor) { 
      return res.status(404).json({
        status: false,
        message: "Color not found!",
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Color deleted successfully!",
      data : deletedColor,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const getColor = asyncHandler(async (req, res) => {

  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaColor = await Color.findById(id);

    if (!getaColor) {
      return res.status(404).json({
        status: false,
        message: "Color not found!",
        data: {}
      });  
    }

    return res.status(200).json({
      status: true,
      message: "Color found successfully!",
      data: getaColor,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const getallColor = asyncHandler(async (req, res) => {
  try {
    const getallColor = await Color.find();

    if (getallColor.length === 0) {
      
      return res.status(404).json({
        status: false,
        message: "Colors not found!",
        data: {}
      });

    }

    return res.status(200).json({
      status: true,
      message: "Colors retrieved  successfully!",
      data: getallColor,
    });
    
  } catch (error) {
    
    return res.status(500).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});
module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
};
