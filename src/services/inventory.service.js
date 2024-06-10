"use strict";

const InventoryRepository = require("../repositories/inventory.repo");
const Product = require("../models/product.model");
const Warehouse = require("../models/warehouse.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const ProductService = require("./product.service");
const WarehouseService = require("./warehouse.service");
const Inventory = require("../models/inventory.model");

class InventoryService {
    static async getAllInventories() {
        const inventories = await InventoryRepository.getAllInventories();
        return inventories.map((inv) => this.mapToInventoryModel(inv));
    }

    static async getInventoryById(inventoryId) {
        const inventory =
            await InventoryRepository.getInventoryById(inventoryId);
        if (!inventory) {
            throw new NotFoundError(
                `Inventory with ID ${inventoryId} not found`
            );
        }
        return this.mapToInventoryModel(inventory);
    }

    static async createInventory(inventoryData) {
        const {
            quantityAvailable,
            minimumStockLevel,
            maximumStockLevel,
            reorderPoint,
            product,
            warehouse,
        } = inventoryData;

        // Validate product and warehouse
        const foundProduct = await ProductService.getProductById(
            product.productId
        );
        if (!(foundProduct instanceof Product)) {
            throw new BadRequestError("Invalid product data");
        }

        const foundWarehouse = await WarehouseService.getWarehouseById(
            warehouse.warehouseId
        );
        if (!(foundWarehouse instanceof Warehouse)) {
            throw new BadRequestError("Invalid warehouse data");
        }

        // Check if the inventory already exists
        const existingInventory = await InventoryRepository.getInventoryById(
            product.productId,
            warehouse.warehouseId
        );
        if (existingInventory) {
            throw new BadRequestError(
                "Inventory already exists for this product and warehouse"
            );
        }

        // Create the inventory
        const newInventory = await InventoryRepository.addInventory({
            quantityAvailable,
            minimumStockLevel,
            maximumStockLevel,
            reorderPoint,
            product,
            warehouse,
        });

        return this.mapToInventoryModel(newInventory);
    }

    static async updateInventory(inventoryId, inventoryData) {
        const {
            quantityAvailable,
            minimumStockLevel,
            maximumStockLevel,
            reorderPoint,
            product,
            warehouse,
        } = inventoryData;

        const foundProduct = await ProductService.getProductById(
            product.productId
        );
        if (!(foundProduct instanceof Product)) {
            throw new BadRequestError("Invalid product data");
        }

        const foundWarehouse = await WarehouseService.getWarehouseById(
            warehouse.warehouseId
        );
        if (!(foundWarehouse instanceof Warehouse)) {
            throw new BadRequestError("Invalid warehouse data");
        }

        // Update the inventory
        const updatedInventory = await InventoryRepository.updateInventory(
            inventoryId,
            {
                quantityAvailable,
                minimumStockLevel,
                maximumStockLevel,
                reorderPoint,
                product,
                warehouse,
            }
        );

        if (!updatedInventory) {
            throw new NotFoundError(`Inventory not found`);
        }

        return this.mapToInventoryModel(updatedInventory);
    }

    static async deleteInventory(inventoryId) {
        const deletedInventory =
            await InventoryRepository.deleteInventory(inventoryId);
        if (!deletedInventory) {
            throw new NotFoundError(`Inventory not found`);
        }
        return this.mapToInventoryModel(deletedInventory);
    }

    static mapToInventoryModel(dbInventory) {
        return new Inventory(
            dbInventory.InventoryID,
            dbInventory.QuantityAvailable,
            dbInventory.MinimumStockLevel,
            dbInventory.MaximumStockLevel,
            dbInventory.ReorderPoint,
            new Product(
                dbInventory.ProductId,
                dbInventory.ProductCode,
                dbInventory.Barcode,
                dbInventory.ProductName,
                dbInventory.ProductDescription,
                dbInventory.ProductCategory,
                dbInventory.ReorderQuantity,
                dbInventory.PackedWeight,
                dbInventory.ParkedHeight,
                dbInventory.ParkedWidth,
                dbInventory.ParkedDepth,
                dbInventory.Refrigerated
            ),
            new Warehouse(
                dbInventory.WarehouseID,
                dbInventory.WarehouseName,
                dbInventory.IsRefrigerated,
                dbInventory.Location_LocationID
            )
        );
    }
}

module.exports = InventoryService;
