const express = require("express");
const couponController = require("../../controller/admin/couponController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const couponValidator = require("../../validators/admin/couponValidator.js");

const router = express.Router();

router.post("/", 
    authMiddleware,
    isAdmin,
    couponValidator.createCouponValidation,
    couponController.createCoupon
);

router.get("/",
    authMiddleware,
    isAdmin,
    couponController.getAllCoupons
);

router.get("/:id",
    authMiddleware,
    isAdmin,
    couponValidator.getCouponByIdValidation,
    couponController.getCoupon
);
 
router.put("/:id",
    authMiddleware,
    isAdmin,
    couponValidator.updateCouponValidation,
    couponController.updateCoupon
);

router.delete("/:id",
    authMiddleware,
    isAdmin,
    couponValidator.getCouponByIdValidation,
    couponController.deleteCoupon
);

module.exports = router;
