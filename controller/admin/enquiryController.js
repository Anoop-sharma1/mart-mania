const Enquiry = require("../../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const updateEnquiry = asyncHandler(async (req, res) => {

  const { id } = req.params;
  validateMongoDbId(id);

  try {
    console.log(req.body, "body");
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if(!updatedEnquiry){
      return res.status(400).json({
        status: false,
        message: "No Enquiry found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Enquiry updated successfully!",
      data : updatedEnquiry,
    });

  } catch (error) {
    
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) { 
      return res.status(400).json({
        status: false,
        message: "No Enquiry found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Enquiry deleted successfully!",
      data : deletedEnquiry,
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
  
  try {

    const getaEnquiry = await Enquiry.findById(id);

    if (!getaEnquiry) { 
      return res.status(400).json({
        status: false,
        message: "No Enquiry found!",
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Enquiry retrieved successfully!",
      data : getaEnquiry,
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
        message: "No Enquiries found!",
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Enquiries retrieved successfully!",
      data : getallEnquiry,
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
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};
