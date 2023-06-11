const express = require("express");
const wishListController = require("../controller/wishListController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const wishlistValidator = require("../validators/wishlistValidator");
const router = express.Router();

router.get("/",
    authMiddleware,
    wishListController.getWishlist
);

router.post("/",
    authMiddleware,
    wishlistValidator.create,
    wishListController.create
);

module.exports = router;