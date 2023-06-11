const express = require("express");
const orderValidator = require("../../validators/admin/orderValidator");
const orderController = require("../../controller/admin/orderController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("/",
    authMiddleware,
    isAdmin,
    orderController.getAllOrders
);

router.put("/:id",
    authMiddleware,
    isAdmin,
    orderValidator.updateOrderValidation,
    orderController.updateOrderStatus
);

module.exports = router;
