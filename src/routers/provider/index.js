"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const providerController = require("../../controllers/provider.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.get("", asyncHandler(providerController.getListProvider));
router.get("/:providerId", asyncHandler(providerController.getDetailProvider));
router.post("", asyncHandler(providerController.createNewProvider));
router.patch("", asyncHandler(providerController.updateProvider));

module.exports = router;
