const express = require("express");
const ratingController = require("../controller/ratingController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const ratingValidator = require("../validators/ratingValidator");
const router = express.Router();

router.put("/",
    authMiddleware,
    ratingValidator.rating,
    ratingController.rating
);

module.exports = router;
