const express = require("express");
const colorController = require("../controller/colorController");

const router = express.Router();

router.get("/:id",
  colorController.getColor
);

router.get("/",
  colorController.getallColor
);

module.exports = router;
