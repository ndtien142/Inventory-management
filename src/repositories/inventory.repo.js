const dbService = require("../services/database.service");

function getAllInventory(callback) {
    const query = `
        SELECT * FROM Inventory;
    `;
    dbService.executeQuery(query, callback);
}

function getInventoryById(inventoryId, callback) {
    const query = `
        SELECT * FROM Inventory
        WHERE InventoryID = @inventoryId;
    `;
    const params = [
        { name: "inventoryId", type: dbService.TYPES.Int, value: inventoryId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addInventory(inventory, callback) {
    const query = `
        INSERT INTO Inventory (QuantityAvailable, MinimumStockLevel, MaximumStockLevel, ReorderPoint, Product_ProductId, Warehouse_WarehouseID)
        VALUES (@quantityAvailable, @minimumStockLevel, @maximumStockLevel, @reorderPoint, @productId, @warehouseId);
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
            value: inventory.productId,
        },
        {
            name: "warehouseId",
            type: dbService.TYPES.Int,
            value: inventory.warehouseId,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateInventory(inventoryId, inventory, callback) {
    const query = `
        UPDATE Inventory
        SET QuantityAvailable = @quantityAvailable,
            MinimumStockLevel = @minimumStockLevel,
            MaximumStockLevel = @maximumStockLevel,
            ReorderPoint = @reorderPoint,
            Product_ProductId = @productId,
            Warehouse_WarehouseID = @warehouseId
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
            value: inventory.productId,
        },
        {
            name: "warehouseId",
            type: dbService.TYPES.Int,
            value: inventory.warehouseId,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteInventory(inventoryId, callback) {
    const query = `
        DELETE FROM Inventory
        WHERE InventoryID = @inventoryId;
    `;
    const params = [
        { name: "inventoryId", type: dbService.TYPES.Int, value: inventoryId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllInventory,
    getInventoryById,
    addInventory,
    updateInventory,
    deleteInventory,
};
