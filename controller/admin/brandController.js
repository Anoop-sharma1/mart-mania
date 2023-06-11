const Brand = require("../../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const { DUPLICATE_ITEM_ERROR_CODE } = require("../../helpers/constants");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    
    return res.status(200).json({
      status: true,
      message: "Brand created successfully!",
      data: newBrand,
    });

  } catch (error) {

      if (error.code === DUPLICATE_ITEM_ERROR_CODE) { 
        error.message = "Brand already exists!";
      }
    
      return res.status(400).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({
        status: false,
        message: "Brand not found!",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brand updated successfully!",
      data: updatedBrand,
    });

  } catch (error) {
      if (error.code === DUPLICATE_ITEM_ERROR_CODE) { 
        error.message = "Brand already exists!";
      }
    
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    
    if (!deletedBrand) {
      return res.status(404).json({
        status: false,
        message: "Brand not found!",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brand deleted successfully!",
      data: deletedBrand,
    });

  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaBrand = await Brand.findById(id);

    if (!getaBrand) {
      return res.status(404).json({
        status: false,
        message: "Brand not found!",
        data: {},
      })
    }

    return res.status(200).json({
      status: true,
      message: "Brand found successfully!",
      data: getaBrand,
    });

  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const getallBrand = asyncHandler(async (req, res) => {
  try {
    const getallBrand = await Brand.find();

    if(getallBrand .length === 0){
      return res.status(404).json({
        status: false,
        message: "Brand not found!",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brand found successfully!",
      data: getallBrand,
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
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
};
