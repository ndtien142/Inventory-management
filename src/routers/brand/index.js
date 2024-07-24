"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const brandController = require("../../controllers/brand.controller");
const router = express.Router();

router.get("", asyncHandler(brandController.getAllBrand));
router.get("/:id", asyncHandler(brandController.getBrandById));
router.post("", asyncHandler(brandController.createNewBrand));
router.patch("/:id", asyncHandler(brandController.updateBrand));
router.delete("/:id", asyncHandler(brandController.deleteBrand));

module.exports = router;
