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
    getOrderStatistics = async (req, res, next) => [
        new SuccessResponse({
            message: "Get order statistics successfully",
            metadata: await orderService.getOrderStatistics(),
        }).send(res),
    ];
    getAllOrder = async (req, res, next) => [
        new SuccessResponse({
            message: "Get order statistics successfully",
            metadata: await orderService.getAllOrder(req.query),
        }).send(res),
    ];
}

module.exports = new OrderController();
