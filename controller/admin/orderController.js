const OrderModel = require("../../models/orderModel");

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const allUserOrders = await OrderModel.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    
    if (allUserOrders.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No orders found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `All orders retrieved successfully!`,
      data: allUserOrders
    });

  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
    
  validateMongoDbId(id);

  try {
    const updateOrderStatus = await OrderModel.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    
    if (!updateOrderStatus) { 
      return res.status(404).json({
        status: false,
        message: `Order not found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `Order status updated successfully!`,
      data: updateOrderStatus
    });
    
  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });s
  }
});


module.exports = {
    getAllOrders,
    updateOrderStatus,
};
