"use strict";

const SKU = require("../product/sku.model");
const Purchase = require("./purchase.model");

class PaymentTransaction {
    constructor({
        id,
        purchase,
        sku,
        quantity,
        price,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.purchase = purchase instanceof Purchase ? purchase : null;
        this.sku = sku instanceof SKU ? sku : null;
        this.quantity = quantity;
        this.price = price;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = PaymentTransaction;
