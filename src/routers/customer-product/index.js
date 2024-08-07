"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const customerProductController = require("../../controllers/customerController");
const router = express.Router();

router.get("", asyncHandler(customerProductController.getListProduct));
router.get(
    "/:productId",
    asyncHandler(customerProductController.getDetailProduct)
);

module.exports = router;
