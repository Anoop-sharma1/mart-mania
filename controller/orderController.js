const OrderModel = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userOrders = await OrderModel.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
        .exec();
      
      if (!userOrders) {
          return res.status(400).json({
              status : false,
              message: "No orders found!",
              data:{}
          });
      }

      return res.status(200).json({
          status: true,
          message: "Orders retrieved successfully!",
          data:userOrders
      });

  } catch (error) {
      return res.status(400).json({
          status: false,
          message: error.message,
          data: {}
      })
  }
});

module.exports = {
  getOrders,
};
