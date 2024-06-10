const dbService = require("../services/database.service");

function getAllWarehouses(callback) {
    const query = `
        SELECT * FROM Warehouse;
    `;
    dbService.executeQuery(query, callback);
}

function getWarehouseById(warehouseId, callback) {
    const query = `
        SELECT * FROM Warehouse
        WHERE WarehouseID = @warehouseId;
    `;
    const params = [
        { name: "warehouseId", type: dbService.TYPES.Int, value: warehouseId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addWarehouse(warehouse, callback) {
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
    dbService.executePreparedStatement(query, params, callback);
}

function updateWarehouse(warehouseId, warehouse, callback) {
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
    dbService.executePreparedStatement(query, params, callback);
}
