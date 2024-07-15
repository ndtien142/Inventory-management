"use strict";

const Product = require("./product.model");
const Unit = require("./unit.model");

class SKU {
    constructor({
        skuNo,
        product,
        name,
        description,
        image,
        unit,
        price,
        stock,
        isDefault,
        isDeleted,
        createTime,
        updateTime,
    }) {
        this.skuNo = skuNo;
        this.product = product instanceof Product ? product : new Product();
        this.name = name;
        this.description = description;
        this.image = image;
        this.unit = unit instanceof Unit ? unit : new Unit();
        this.price = price;
        this.stock = stock;
        this.isDefault = isDefault;
        this.isDeleted = isDeleted;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = SKU;
