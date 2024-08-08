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
    getOrderStatistics = async (req, res, next) => {
        new SuccessResponse({
            message: "Get order statistics successfully",
            metadata: await orderService.getOrderStatistics(),
        }).send(res);
    };
    getAllOrder = async (req, res, next) => [
        new SuccessResponse({
            message: "Get order statistics successfully",
            metadata: await orderService.getAllOrder(req.query),
        }).send(res),
    ];
    getDetailOrder = async (req, res, next) => {
        new SuccessResponse({
            message: "Get order detail successfully",
            metadata: await orderService.getDetailOrder(req.params.id),
        }).send(res);
    };
    updateOrderStatus = async (req, res, next) => {
        new SuccessResponse({
            message: "Update order status successfully",
            metadata: await orderService.updateOrder(req.params.id, req.body),
        }).send(res);
    };
    getListCustomerOrder = async (req, res, next) => {
        new SuccessResponse({
            message: "Update order status successfully",
            metadata: await orderService.getCustomerOrders({
                orderStatus: req.params.orderStatus,
                userCode: req.user.userCode,
                limit: req.params.limit,
                page: req.params.params,
            }),
        }).send(res);
    };
    getCustomerOrderStatistics = async (req, res, next) => {
        new SuccessResponse({
            message: "Get order statistics successfully",
            metadata: await orderService.getOrderCustomerStatistics(
                req.user.userCode
            ),
        }).send(res);
    };
    getDetailCustomerOrder = async (req, res, next) => {
        new SuccessResponse({
            message: "Get customer order detail successfully",
            metadata: await orderService.getCustomerOrderDetail(
                req.user.userCode,
                req.params.id
            ),
        }).send(res);
    };
    customerCancelOrder = async (req, res, next) => {
        new SuccessResponse({
            message: "Update order status successfully",
            metadata: await orderService.cancelOrderByCustomer(
                req.user.userCode,
                req.params.id
            ),
        }).send(res);
    };
}

module.exports = new OrderController();
