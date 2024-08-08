"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const orderController = require("../../controllers/order.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.get("", asyncHandler(orderController.getListCustomerOrder));
router.get(
    "/statistics",
    asyncHandler(orderController.getCustomerOrderStatistics)
);
router.get("/:id", asyncHandler(orderController.getDetailCustomerOrder));

router.post("", asyncHandler(orderController.createOrder));
router.patch("/:id", asyncHandler(orderController.customerCancelOrder));

module.exports = router;
