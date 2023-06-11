const express = require("express");
const brandController = require("../controller/brandController");

const router = express.Router();

router.get("/:id",
  brandController.getBrand
);

router.get("/",
  brandController.getallBrand
);

module.exports = router;
