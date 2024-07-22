"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const purchaseController = require("../../controllers/purchase.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);
router.post("", asyncHandler(purchaseController.createPurchase));
router.get("/:purchaseId", asyncHandler(purchaseController.getDetailPurchase));

module.exports = router;
