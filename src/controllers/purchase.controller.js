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
}

module.exports = new PurchaseController();
