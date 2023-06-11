const express = require("express");
const cartValidator = require("../validators/cartValidator");
const cartController = require("../controller/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",
    authMiddleware,
    cartValidator.addCart,
    cartController.userCart
);

router.post("/apply-coupon",
    authMiddleware,
    cartValidator.applyCoupon,
    cartController.applyCoupon
);

router.post("/cash-order",
    authMiddleware,
    cartValidator.order,
    cartController.createOrder
);

router.get("/",
    authMiddleware,
    cartController.getUserCart
);

router.delete("/",
    authMiddleware,
    cartController.emptyCart
);

module.exports = router;
