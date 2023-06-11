const express = require("express");
const orderController = require("../controller/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",
    authMiddleware,
    orderController.getOrders
);

module.exports = router;