const express = require("express");
const colorController = require("../../controller/admin/colorController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const colorValidator = require("../../validators/admin/colorValidator");

const router = express.Router();

router.post("/",
  authMiddleware,
  isAdmin,
  colorValidator.createColorValidation,
  colorController.createColor
);

router.put("/:id",
  authMiddleware,
  isAdmin,
  colorValidator.updateColorValidation,
  colorController.updateColor
);

router.delete("/:id",
  authMiddleware,
  isAdmin,
  colorValidator.getColorByIdValidation,
  colorController.deleteColor
);

router.get("/:id",
  authMiddleware,
  isAdmin,
  colorValidator.getColorByIdValidation,
  colorController.getColor
);

router.get("/",
  authMiddleware,
  isAdmin,
  colorController.getallColor
);

module.exports = router;
