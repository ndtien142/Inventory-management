"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const productController = require("../../controllers/product.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.get("", asyncHandler(productController.getListProduct));
router.get("/sku", asyncHandler(productController.getSKUProduct));
router.get("/:productId", asyncHandler(productController.getDetailProduct));
router.post("", asyncHandler(productController.createNewProduct));
router.patch(
    "status/:productId",
    asyncHandler(productController.updateStatusProduct)
);
router.patch("/:productId", asyncHandler(productController.updateProduct));

module.exports = router;
