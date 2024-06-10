"use strict";

const Location = require("./location.model");

class Warehouse {
    constructor(warehouseID, warehouseName, isRefrigerated, location) {
        this.warehouseID = warehouseID;
        this.warehouseName = warehouseName;
        this.isRefrigerated = isRefrigerated;
        this.location =
            location instanceof Location ? location : new Location();
    }
}

module.exports = Warehouse;
