const express = require("express");
const userValidator = require("../validators/userValidator");
const userController = require("../controller/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.put("/password",
  authMiddleware,
  userValidator.updatePassword,
  userController.updatePassword
);

router.put("/save-address",
  authMiddleware,
  userValidator.saveAddress,
  userController.saveAddress
);

router.put("/",
  authMiddleware,
  userValidator.update,
  userController.updatedUser
);

module.exports = router;