const ColorModel = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaColor = await ColorModel.findById(id);

    if (!getaColor) {
      return res.status(400).json({
      status: false,
      message: "Color not found!",
      data: {}
      })
    };

    return res.status(200).json({
      status: true,
      message: "Color retrieved successfully!",
      data: getaColor
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const getallColor = asyncHandler(async (req, res) => {
  try {
    const getallColor = await ColorModel.find();
    if (!getallColor) {
      return res.status(400).json({
        status: false,
        message: "Color not found!",
        data: {}
      });
    }
    
    return res.status(200).json({
      status: true,
      message: "Color retrieved successfully!",
      data: getallColor
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
  getColor,
  getallColor,
};
