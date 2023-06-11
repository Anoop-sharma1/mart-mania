const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaBrand = await Brand.findById(id);

    if (!getaBrand) {
      return res.status(400).json({
        status: false,
        message: "Brand not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brand retrieved successfully!",
      data: getaBrand
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const getallBrand = asyncHandler(async (req, res) => {
  try {
    const getallBrand = await Brand.find();

    if (getallBrand.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Brand not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brand retrieved successfully!",
      data: getallBrand
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
  getBrand,
  getallBrand,
};
