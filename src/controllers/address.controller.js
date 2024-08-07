"use strict";

const addressService = require("../services/order/address.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class AddressController {
    createAddress = async (req, res, next) => {
        new SuccessResponse({
            message: "Address created successfully",
            metadata: await addressService.createAddress({
                userCode: req.user.userCode,
                ...req.body,
            }),
        }).send(res);
    };

    getAddressById = async (req, res, next) => {
        new SuccessResponse({
            message: "Address retrieved successfully",
            metadata: await addressService.getAddressById(req.params.id),
        }).send(res);
    };

    getAddressesByUserCode = async (req, res, next) => {
        new SuccessResponse({
            message: "Addresses retrieved successfully",
            metadata: await addressService.getAddressesByUserCode(
                req.user.userCode
            ),
        }).send(res);
    };

    updateAddress = async (req, res, next) => {
        new SuccessResponse({
            message: "Address updated successfully",
            metadata: await addressService.updateAddress(
                req.params.id,
                req.body
            ),
        }).send(res);
    };

    deleteAddress = async (req, res, next) => {
        new SuccessResponse({
            message: "Address deleted successfully",
            metadata: await addressService.deleteAddress(req.params.id),
        }).send(res);
    };
}

module.exports = new AddressController();
