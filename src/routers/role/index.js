"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const roleController = require("../../controllers/role.controller");
const router = express.Router();

router.get("", asyncHandler(roleController.getAllRoles));
router.get("/:id", asyncHandler(roleController.getRoleById));

module.exports = router;
