"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const orderController = require("../../controllers/order.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.get("", asyncHandler(orderController.getAllOrder));
router.get(
    "/order-statistics",
    asyncHandler(orderController.getOrderStatistics)
);
router.get("/:id", asyncHandler(orderController.getDetailOrder));
router.patch("/:id", asyncHandler(orderController.updateOrderStatus));

module.exports = router;
