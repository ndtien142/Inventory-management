"use strict";

const Account = require("../authentication/account.model");
const PaymentMethod = require("../payment/paymentMothod.model");
const SKU = require("../product/sku.model");
const userAddress = require("../user/userAddress.model");
const Purchase = require("./purchase.model");

class Order {
    constructor({
        id,
        account,
        address,
        payment,
        orderDate,
        total,
        status,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.account = account instanceof Account ? account : null;
        this.address = address instanceof userAddress ? address : null;
        this.payment = payment instanceof PaymentMethod ? payment : null;
        this.orderDate = orderDate;
        this.total = total;
        this.status = status; // Enum: "pending", "processing", "shipped", "delivered", "cancelled"
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Order;
