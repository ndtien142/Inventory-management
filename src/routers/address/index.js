"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const addressController = require("../../controllers/address.controller"); // Đường dẫn đến AddressController
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.use(authenticationV2);

router.post("/", asyncHandler(addressController.createAddress));
router.get("", asyncHandler(addressController.getAddressesByUserCode));
router.get("/:id", asyncHandler(addressController.getAddressById));
router.put("/:id", asyncHandler(addressController.updateAddress));
router.delete("/:id", asyncHandler(addressController.deleteAddress));

module.exports = router;
