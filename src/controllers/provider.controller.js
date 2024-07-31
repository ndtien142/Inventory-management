"use strict";

const providerService = require("../services/purchase/provider.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class ProviderController {
    createNewProvider = async (req, res, next) => {
        new CREATED({
            message: "Create new provider successfully",
            metadata: await providerService.createNewProvider(req.body),
        }).send(res);
    };
    getDetailProvider = async (req, res, next) => {
        new SuccessResponse({
            message: "Get detail provider successfully",
            metadata: await providerService.getDetailProvider(
                req.params.providerId
            ),
        }).send(res);
    };
    getListProvider = async (req, res, next) => {
        new SuccessResponse({
            message: "Get list provider successfully",
            metadata: await providerService.getListProvider(req.query),
        }).send(res);
    };
    updateProvider = async (req, res, next) => {
        new SuccessResponse({
            message: "Update provider successfully",
            metadata: await providerService.updateProvider(
                req.params.providerId,
                req.body
            ),
        }).send(res);
    };
}

module.exports = new ProviderController();
