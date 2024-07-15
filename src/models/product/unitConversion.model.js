"use strict";

const Product = require("./product.model");
const Unit = require("./unit.model");

class UnitConversion {
    constructor({
        id,
        baseUnit,
        conversionUnit,
        rateConversion,
        product,
        isDeleted,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.baseUnit = baseUnit instanceof Unit ? baseUnit : new Unit();
        this.conversionUnit =
            conversionUnit instanceof Unit ? conversionUnit : new Unit();
        this.rateConversion = rateConversion;
        this.product = product instanceof Product ? product : new Product();
        this.isDeleted = isDeleted;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = UnitConversion;
