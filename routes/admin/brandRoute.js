const express = require("express");
const brandController = require("../../controller/admin/brandController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const brandValidator = require("../../validators/admin/brandValidator");

const router = express.Router();

router.post("/",
  authMiddleware,
  isAdmin,
  brandValidator.createBrandValidation,
  brandController.createBrand
);

router.put("/:id",
  authMiddleware,
  isAdmin,
  brandValidator.updateBrandValidation,
  brandController.updateBrand
);

router.delete("/:id",
  authMiddleware,
  isAdmin,
  brandController.deleteBrand
);

router.get("/:id",
 authMiddleware,
 isAdmin,
 brandValidator.getBrandByIdValidation,
 brandController.getBrand
);

router.get("/",
  authMiddleware,
  isAdmin,
  brandController.getallBrand
);

module.exports = router;
