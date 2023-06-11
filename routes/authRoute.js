const express = require("express");
const authValidator = require("../validators/authValidator");
const authController = require("../controller/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register",
  authValidator.register,
  authController.register
);

router.post("/forgot-password",
  authValidator.forgorPassword,
  authController.forgotPassword
);

router.put("/reset-password/:token",
  authValidator.resetPassword,
  authController.resetPassword
);

router.post("/login",
  authValidator.login,
  authController.login
);

router.get("/refresh",
  authController.handleRefreshToken
);

router.get("/logout",
  authMiddleware,
  authController.logout
);

module.exports = router;
