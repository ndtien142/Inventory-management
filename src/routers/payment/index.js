"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const paymentMethodController = require("../../controllers/payment.controller");
const router = express.Router();

router.get("", asyncHandler(paymentMethodController.getListPaymentMethod));

module.exports = router;
