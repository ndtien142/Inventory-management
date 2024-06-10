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
        product = new Product(),
        warehouse = new Warehouse()
    ) {
        this.inventoryId = inventoryId;
        this.quantityAvailable = quantityAvailable;
        this.minimumStockLevel = minimumStockLevel;
        this.maximumStockLevel = maximumStockLevel;
        this.reorderPoint = reorderPoint;

        if (product instanceof Product) {
            this.product = product;
        } else {
            this.product = new Product();
        }
        if (warehouse instanceof Warehouse) {
            this.warehouse = warehouse;
        } else {
            this.warehouse = new Warehouse();
        }
    }
}

module.exports = Inventory;
