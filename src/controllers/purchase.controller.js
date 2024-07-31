"use strict";

const purchaseService = require("../services/purchase/purchase.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class PurchaseController {
    createPurchase = async (req, res, next) => {
        new SuccessResponse({
            message: "Create new purchase successfully",
            metadata: await purchaseService.createPurchase(req.body),
        }).send(res);
    };
    getDetailPurchase = async (req, res, next) => {
        new SuccessResponse({
            message: "Get detail purchase successfully",
            metadata: await purchaseService.getPurchaseById(
                req.params.purchaseId
            ),
        }).send(res);
    };
    updatePurchaseStatus = async (req, res, next) => {
        new SuccessResponse({
            message: "Update purchase status successfully",
            metadata: await purchaseService.updatePurchaseStatus(
                req.params.purchaseId,
                req.body.status,
                req.user
            ),
        }).send(res);
    };
    getAllPurchase = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all purchase successfully",
            metadata: await purchaseService.getAllPurchase(req.query),
        }).send(res);
    };
}

module.exports = new PurchaseController();
