"use strict";

const SKU = require("../product/sku.model");
const Purchase = require("./purchase.model");

class PaymentMethod {
    constructor({ id, name, description, isActive, createTime, updateTime }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = PaymentMethod;
