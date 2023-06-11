const express = require("express");
const enquiryController = require("../controller/enquiryController");
const enquiryValidator = require("../validators/enquiryValidator");
const router = express.Router();

router.post("/",
  enquiryValidator.create,
  enquiryController.createEnquiry
);

router.get("/:id",
  enquiryController.getEnquiry
);

router.get("/",
  enquiryController.getallEnquiry
);

module.exports = router;
