"use strict";

const Provider = require("./provider.model");

class Order {
    constructor(orderId, orderDate, provider) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.provider =
            provider instanceof Provider ? provider : new Provider();
    }
}

module.exports = Order;
