"use strict";

const SKU = require("../product/sku.model");
const Order = require("./order.model");

class OrderLineItem {
    constructor({
        id,
        order,
        sku,
        quantity,
        pricePerUnit,
        unitName,
        subTotal,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.order = order instanceof Order ? order : null;
        this.sku = sku instanceof SKU ? sku : null;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.unitName = unitName;
        this.subTotal = subTotal;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = OrderLineItem;
