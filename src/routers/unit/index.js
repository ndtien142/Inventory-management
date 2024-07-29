"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const unitController = require("../../controllers/unit.controller");
const router = express.Router();

router.get("", asyncHandler(unitController.getAllUnit));

module.exports = router;
