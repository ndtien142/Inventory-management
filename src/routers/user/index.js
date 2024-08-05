"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const userController = require("../../controllers/user.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.get("", asyncHandler(userController.getAllUsers));
router.get("/:id", asyncHandler(userController.getUserById));
router.post("", asyncHandler(userController.createUser));
router.put("/:id", asyncHandler(userController.updateUser));
router.patch("/:id/delete", asyncHandler(userController.markUserAsDeleted));
router.patch("/:id/block", asyncHandler(userController.markUserAsBlocked));

module.exports = router;
