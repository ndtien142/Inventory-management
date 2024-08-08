"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const paymentMethodService = require("../services/order/payment.service");

class PaymentController {
    getListPaymentMethod = async (req, res, next) => {
        new SuccessResponse({
            message: "Create new order successfully",
            metadata: await paymentMethodService.getPaymentMethod(),
        }).send(res);
    };
}

module.exports = new PaymentController();
