const express = require("express");
const authValidator = require("../../validators/admin/authValidator");
const authController = require("../../controller/admin/authController");

const router = express.Router();

router.post("/login",
  authValidator.loginValidation,
  authController.login
);

router.post("/forgot-password",
  authValidator.forgotPasswordValidation,
  authController.forgotPassword
);

router.post("/reset-password/:token",
  authValidator.resetPasswordValidation,
  authController.resetPassword
);

module.exports = router;
