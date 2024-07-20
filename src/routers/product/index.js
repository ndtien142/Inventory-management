"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const productController = require("../../controllers/product.controller");
const router = express.Router();

router.get("", asyncHandler(productController.getListProduct));
router.get("/:productId", asyncHandler(productController.getDetailProduct));

router.post("", asyncHandler(productController.createNewProduct));

module.exports = router;
