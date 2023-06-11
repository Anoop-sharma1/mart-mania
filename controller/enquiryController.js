const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    
    return res.status(200).json({
      status: true,
      message: "Enquiry created successfully!",
      data: newEnquiry,
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const getaEnquiry = await Enquiry.findById(id);

    if (!getaEnquiry) {
      return res.status(400).json({
        status: false,
        message: "Enquiry not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Enquiry retrieved successfully!",
      data: getaEnquiry,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find();
    
    if (getallEnquiry.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Enquiry not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Enquiry retrieved successfully!",
      data: getallEnquiry
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
  createEnquiry,
  getEnquiry,
  getallEnquiry,
};
