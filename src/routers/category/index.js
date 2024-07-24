"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const categoryController = require("../../controllers/category.controller");
const router = express.Router();

router.get("/tree", asyncHandler(categoryController.getTreeCategory));
router.get("/:id", asyncHandler(categoryController.getCategoryById));
router.get("", asyncHandler(categoryController.getCategory));
router.patch("/:id", asyncHandler(categoryController.updateCategory));
router.post("", asyncHandler(categoryController.createNewCategory));

module.exports = router;
