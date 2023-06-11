const express = require("express");
const userValidator = require("../../validators/admin/userValidator");
const userController = require("../../controller/admin/userController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("/",
  authMiddleware,
  isAdmin,
  userController.getAllUsers
);

router.get("/current",
  authMiddleware,
  isAdmin,
  userController.getLoggedInUser
);

router.get("/:id",
  authMiddleware,
  isAdmin,
  userValidator.getUserByIdValidation,
  userController.getaUser
);

router.put("/block/:id",
  authMiddleware,
  isAdmin,
  userValidator.getUserByIdValidation,
  userController.blockUser
);

router.put("/unblock/:id",
  authMiddleware,
  isAdmin,
  userValidator.getUserByIdValidation,
  userController.unblockUser
);

router.post("/profile",
  authMiddleware,
  isAdmin,
  userController.profile
);

router.post("/",
  authMiddleware,
  isAdmin,
  userValidator.update,
  userController.update
);

module.exports = router;
