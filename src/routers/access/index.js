"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.post("/signup", asyncHandler(accessController.signUp));
router.post("/signup-customer", asyncHandler(accessController.signUpCustomer));
router.post("/login", asyncHandler(accessController.login));

router.use(authenticationV2);
router.get("/profile", asyncHandler(accessController.getUserProfile));

module.exports = router;
