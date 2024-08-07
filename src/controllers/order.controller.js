"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const orderService = require("../services/order/order.service");

class OrderController {
    createOrder = async (req, res, next) => {
        new CREATED({
            message: "Create new order successfully",
            metadata: await orderService.createOrder({
                ...req.body,
                userCode: req.user.userCode,
            }),
        }).send(res);
    };
}

module.exports = new OrderController();
