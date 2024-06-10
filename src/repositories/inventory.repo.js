"use strict";

const dbService = require("../services/database.service");

async function getAllInventories() {
    const query = `
        SELECT i.InventoryID, i.QuantityAvailable, i.MinimumStockLevel, i.MaximumStockLevel,
               i.ReorderPoint, p.*, w.*
        FROM Inventory i
        INNER JOIN Product p ON i.Product_ProductId = p.ProductId
        INNER JOIN Warehouse w ON i.Warehouse_WarehouseID = w.WarehouseID;
    `;
    return await dbService.executeQuery(query);
}

async function getInventoryById(inventoryId) {
    const query = `
        SELECT i.InventoryID, i.QuantityAvailable, i.MinimumStockLevel, i.MaximumStockLevel,
               i.ReorderPoint, p.*, w.*
        FROM Inventory i
        INNER JOIN Product p ON i.Product_ProductId = p.ProductId
        INNER JOIN Warehouse w ON i.Warehouse_WarehouseID = w.WarehouseID
        WHERE i.InventoryID = @inventoryId;
    `;
    const params = [
        { name: "inventoryId", type: dbService.TYPES.Int, value: inventoryId },
    ];
    const results = await dbService.executeQuery(query, params);
    return results.length > 0 ? results[0] : null;
}

async function addInventory(inventory) {
    const query = `
        INSERT INTO Inventory (QuantityAvailable, MinimumStockLevel, MaximumStockLevel,
                               ReorderPoint, Product_ProductId, Warehouse_WarehouseID)
        OUTPUT INSERTED.*
        VALUES (@quantityAvailable, @minimumStockLevel, @maximumStockLevel,
                @reorderPoint, @productId, @warehouseId);
    `;
    const params = [
        {
            name: "quantityAvailable",
            type: dbService.TYPES.Int,
            value: inventory.quantityAvailable,
        },
        {
            name: "minimumStockLevel",
            type: dbService.TYPES.Int,
            value: inventory.minimumStockLevel,
        },
        {
            name: "maximumStockLevel",
            type: dbService.TYPES.Int,
            value: inventory.maximumStockLevel,
        },
        {
            name: "reorderPoint",
            type: dbService.TYPES.Int,
            value: inventory.reorderPoint,
        },
        {
            name: "productId",
            type: dbService.TYPES.Int,
            value: inventory.product.productId,
        },
        {
            name: "warehouseId",
            type: dbService.TYPES.Int,
            value: inventory.warehouse.warehouseId,
        },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function updateInventory(inventoryId, inventory) {
    const query = `
        UPDATE Inventory
        SET QuantityAvailable = @quantityAvailable,
            MinimumStockLevel = @minimumStockLevel,
            MaximumStockLevel = @maximumStockLevel,
            ReorderPoint = @reorderPoint,
            Product_ProductId = @productId,
            Warehouse_WarehouseID = @warehouseId
        OUTPUT INSERTED.*
        WHERE InventoryID = @inventoryId;
    `;
    const params = [
        { name: "inventoryId", type: dbService.TYPES.Int, value: inventoryId },
        {
            name: "quantityAvailable",
            type: dbService.TYPES.Int,
            value: inventory.quantityAvailable,
        },
        {
            name: "minimumStockLevel",
            type: dbService.TYPES.Int,
            value: inventory.minimumStockLevel,
        },
        {
            name: "maximumStockLevel",
            type: dbService.TYPES.Int,
            value: inventory.maximumStockLevel,
        },
        {
            name: "reorderPoint",
            type: dbService.TYPES.Int,
            value: inventory.reorderPoint,
        },
        {
            name: "productId",
            type: dbService.TYPES.Int,
            value: inventory.product.productId,
        },
        {
            name: "warehouseId",
            type: dbService.TYPES.Int,
            value: inventory.warehouse.warehouseId,
        },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function deleteInventory(inventoryId) {
    const query = `
        DELETE FROM Inventory
        OUTPUT DELETED.*
        WHERE InventoryID = @inventoryId;
    `;
    const params = [
        { name: "inventoryId", type: dbService.TYPES.Int, value: inventoryId },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

module.exports = {
    getAllInventories,
    getInventoryById,
    addInventory,
    updateInventory,
    deleteInventory,
};
