const dbService = require("../services/database.service");

async function getAllWarehouses() {
    const query = `SELECT * FROM Warehouse;`;
    return await dbService.executeQuery(query);
}

async function getWarehouseById(warehouseId) {
    const query = `
        SELECT * FROM Warehouse
        WHERE WarehouseID = @warehouseId;
    `;
    const params = [
        { name: "warehouseId", type: dbService.TYPES.Int, value: warehouseId },
    ];
    return await dbService.executeQuery(query, params);
}

async function addWarehouse(warehouse) {
    const query = `
        INSERT INTO Warehouse (WarehouseName, IsRefrigerated, Location_LocationID)
        VALUES (@warehouseName, @isRefrigerated, @locationId);
    `;
    const params = [
        {
            name: "warehouseName",
            type: dbService.TYPES.VarChar,
            value: warehouse.warehouseName,
        },
        {
            name: "isRefrigerated",
            type: dbService.TYPES.Bit,
            value: warehouse.isRefrigerated,
        },
        {
            name: "locationId",
            type: dbService.TYPES.Int,
            value: warehouse.locationId,
        },
    ];
    return await dbService.executeQuery(query, params);
}

async function updateWarehouse(warehouseId, warehouse) {
    const query = `
        UPDATE Warehouse
        SET WarehouseName = @warehouseName,
            IsRefrigerated = @isRefrigerated,
            Location_LocationID = @locationId
        WHERE WarehouseID = @warehouseId;
    `;
    const params = [
        { name: "warehouseId", type: dbService.TYPES.Int, value: warehouseId },
        {
            name: "warehouseName",
            type: dbService.TYPES.VarChar,
            value: warehouse.warehouseName,
        },
        {
            name: "isRefrigerated",
            type: dbService.TYPES.Bit,
            value: warehouse.isRefrigerated,
        },
        {
            name: "locationId",
            type: dbService.TYPES.Int,
            value: warehouse.locationId,
        },
    ];
    return await dbService.executeQuery(query, params);
}

module.exports = {
    getAllWarehouses,
    getWarehouseById,
    addWarehouse,
    updateWarehouse,
};
