"use strict";

const Warehouse = require("./warehouse.model");
const Product = require("./product.model");
const Order = require("./order.model");

class OrderDetail {
    constructor(
        orderDetailId,
        orderQuantity,
        expectedDate,
        actualDate,
        order,
        product,
        warehouse
    ) {
        this.orderDetailId = orderDetailId;
        this.orderQuantity = orderQuantity;
        this.expectedDate = expectedDate;
        this.actualDate = actualDate;
        this.order = order instanceof Order ? order : new Order();
        this.product = product instanceof Product ? product : new Product();
        this.warehouse =
            warehouse instanceof Warehouse ? warehouse : new Warehouse();
    }
}

module.exports = OrderDetail;
