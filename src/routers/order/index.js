"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const orderController = require("../../controllers/order.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.post("", asyncHandler(orderController.createOrder));

module.exports = router;
