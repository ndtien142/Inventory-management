"use strict";

const Location = require("./location.model");

class Warehouse {
    constructor(warehouseId, warehouseName, isRefrigerated, location) {
        this.warehouseId = warehouseId;
        this.warehouseName = warehouseName;
        this.isRefrigerated = isRefrigerated;
        this.location =
            location instanceof Location ? location : new Location();
    }
}

module.exports = Warehouse;
