"use strict";

const SKU = require("../product/sku.model");
const Cart = require("./cart.mode");

class CartLineItem {
    constructor({ id, cart, sku, quantity, createTime, updateTime }) {
        this.id = id;
        this.cart = cart instanceof Cart ? cart : null;
        this.sku = sku instanceof SKU ? sku : null;
        this.quantity = quantity;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = CartLineItem;
