const dbService = require("../services/database.service");

async function getAllWarehouses() {
    const query = `
        SELECT w.WarehouseID, w.WarehouseName, w.IsRefrigerated, l.LocationID, l.LocationName, l.LocationAddress
        FROM Warehouse w
        INNER JOIN Location l ON w.Location_LocationID = l.LocationID;
    `;
    return await dbService.executeQuery(query);
}

async function getWarehouseById(warehouseId) {
    const query = `
        SELECT w.WarehouseID, w.WarehouseName, w.IsRefrigerated, l.LocationID, l.LocationName, l.LocationAddress
        FROM Warehouse w
        INNER JOIN Location l ON w.Location_LocationID = l.LocationID
        WHERE w.WarehouseID = @warehouseId;
    `;
    const params = [
        { name: "warehouseId", type: dbService.TYPES.Int, value: warehouseId },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function getWarehouseByName(warehouseName) {
    const query = `
        SELECT WarehouseName FROM Warehouse 
        WHERE WarehouseName = @warehouseName;
    `;
    const params = [
        {
            name: "warehouseName",
            type: dbService.TYPES.VarChar,
            value: warehouseName,
        },
    ];
    return await dbService.executeQuery(query, params);
}

async function addWarehouse(warehouse) {
    const query = `
        INSERT INTO Warehouse (WarehouseName, IsRefrigerated, Location_LocationID)
        OUTPUT INSERTED.*
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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function updateWarehouse(warehouseId, warehouse) {
    const query = `
        UPDATE Warehouse
        SET WarehouseName = @warehouseName,
            IsRefrigerated = @isRefrigerated,
            Location_LocationID = @locationId
        OUTPUT INSERTED.*
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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function deleteWarehouse(warehouseId) {
    const query = `
    DELETE FROM Warehouse
    OUTPUT DELETED.*
    WHERE WarehouseId = @warehouseId;
    `;
    const params = [
        { name: "warehouseId", type: dbService.TYPES.Int, value: warehouseId },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

module.exports = {
    getAllWarehouses,
    getWarehouseById,
    getWarehouseByName,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
