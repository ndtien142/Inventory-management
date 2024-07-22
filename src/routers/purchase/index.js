"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const purchaseController = require("../../controllers/purchase.controller");
const router = express.Router();

router.post("", asyncHandler(purchaseController.createPurchase));
router.get("/:purchaseId", asyncHandler(purchaseController.getDetailPurchase));

module.exports = router;
