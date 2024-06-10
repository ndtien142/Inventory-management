"use strict";

const Warehouse = require("./warehouse.model");
const Product = require("./product.model");

class Inventory {
    constructor(
        inventoryId,
        quantityAvailable,
        minimumStockLevel,
        maximumStockLevel,
        reorderPoint,
        product,
        warehouse
    ) {
        this.inventoryId = inventoryId;
        this.quantityAvailable = quantityAvailable;
        this.minimumStockLevel = minimumStockLevel;
        this.maximumStockLevel = maximumStockLevel;
        this.reorderPoint = reorderPoint;
        this.product = product instanceof Product ? product : new Product();
        this.warehouse =
            warehouse instanceof Warehouse ? warehouse : new Warehouse();
    }
}

module.exports = Inventory;
