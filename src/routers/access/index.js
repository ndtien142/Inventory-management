"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

// Signup routes
router.post("/account/signup", asyncHandler(accessController.signUp));

// Login routes
router.post("/account/login", asyncHandler(accessController.login));

// authentication
router.use(authenticationV2);

router.post("/account/logout", asyncHandler(accessController.logout));

router.get(
    "/account/group-policies",
    asyncHandler(accessController.groupPolicies)
);

router.get("/account/profile", asyncHandler(accessController.profile));

router.post(
    "/account/handlerRefreshToken",
    asyncHandler(accessController.handlerRefreshToken)
);

module.exports = router;
