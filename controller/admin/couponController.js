const Coupon = require("../../models/couponModel");
const validateMongoDbId = require("../../utils/validateMongodbId");
const asynHandler = require("express-async-handler");

const createCoupon = asynHandler(async (req, res) => {
  try {

    const newCoupon = await Coupon.create(req.body);

    return res.status(200).json({
      status: true,
      message: "Coupon created successfully",
      data : newCoupon,
    });

  } catch (error) {

    return res.status(400).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const getAllCoupons = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();

    if (coupons.length === 0) { 
      return res.status(404).json({
        status: false,
        message: "No coupons found!",
        data: {}
      });
    } 
      
    return res.status(200).json({
      status: true,
      message: "All coupons retrived successfully!",
      data : coupons
    });

  } catch (error) {
    
    return res.status(400).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const updateCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatecoupon) {
      return res.status(400).json({
        status: false,
        message: "Coupon not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Coupon updated successfully!",
      data : updatecoupon
    });

  } catch (error) {
    
    return res.status(400).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const deleteCoupon = asynHandler(async (req, res) => {

  const { id } = req.params;

  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);

    if(!deletecoupon){
      return res.status(400).json({
        status: false,
        message: "Coupon not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: "Coupon deleted successfully!",
      data : deletecoupon
    });

  } catch (error) {
    
    return res.status(400).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

const getCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  
  try {

    const getAcoupon = await Coupon.findById(id);

    if(!getAcoupon){
      return res.status(400).json({
        status: false,
        message: "Coupon not found!",
        data: {}
      });
    }
      
    return res.status(200).json({
      status: true,
      message: "Coupon retrived successfully!",
      data : getAcoupon
    });
    
  } catch (error) {
    
    return res.status(400).json({
      status: false,
      message: error.message,
      data : {}
    });

  }
});

module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
};
