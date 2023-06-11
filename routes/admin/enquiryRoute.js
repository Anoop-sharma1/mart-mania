const express = require("express");
const enquiryController = require("../../controller/admin/enquiryController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const enquiryValidator = require("../../validators/admin/enquiryValidator");

const router = express.Router();

router.put("/:id",
  authMiddleware,
  isAdmin,
  enquiryValidator.updateEnquiryValidation,
  enquiryController.updateEnquiry
);

router.delete("/:id",
  authMiddleware,
  isAdmin,
  enquiryValidator.deleteEnquiryValidation,
  enquiryController.deleteEnquiry
);

router.get("/:id",
  enquiryValidator.getEnquiryValidation,
  enquiryController.getEnquiry
);

router.get("/", enquiryController.getallEnquiry);

module.exports = router;
