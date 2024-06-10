const dbService = require("../services/database.service");

async function getAllTransfers() {
    const query = `SELECT * FROM Transfer;`;
    return await dbService.executeQuery(query);
}

async function getTransferById(transferId) {
    const query = `
        SELECT * FROM Transfer
        WHERE TransferID = @transferId;
    `;
    const params = [
        { name: "transferId", type: dbService.TYPES.Int, value: transferId },
    ];
    return await dbService.executeQuery(query, params);
}

async function addTransfer(transfer) {
    const query = `
        INSERT INTO Transfer (TransferQuantity, SentDate, ReceivedDate, Product_ProductId, Warehouse_WarehouseID_Source, Warehouse_WarehouseID_Destination)
        VALUES (@transferQuantity, @sentDate, @receivedDate, @productId, @sourceWarehouseId, @destinationWarehouseId);
    `;
    const params = [
        {
            name: "transferQuantity",
            type: dbService.TYPES.Int,
            value: transfer.transferQuantity,
        },
        {
            name: "sentDate",
            type: dbService.TYPES.Date,
            value: transfer.sentDate,
        },
        {
            name: "receivedDate",
            type: dbService.TYPES.Date,
            value: transfer.receivedDate,
        },
        {
            name: "productId",
            type: dbService.TYPES.Int,
            value: transfer.productId,
        },
        {
            name: "sourceWarehouseId",
            type: dbService.TYPES.Int,
            value: transfer.sourceWarehouseId,
        },
        {
            name: "destinationWarehouseId",
            type: dbService.TYPES.Int,
            value: transfer.destinationWarehouseId,
        },
    ];
    return await dbService.executeQuery(query, params);
}

async function updateTransfer(transferId, transfer) {
    const query = `
        UPDATE Transfer
        SET TransferQuantity = @transferQuantity,
            SentDate = @sentDate,
            ReceivedDate = @receivedDate,
            Product_ProductId = @productId,
            Warehouse_WarehouseID_Source = @sourceWarehouseId,
            Warehouse_WarehouseID_Destination = @destinationWarehouseId
        WHERE TransferID = @transferId;
    `;
    const params = [
        { name: "transferId", type: dbService.TYPES.Int, value: transferId },
        {
            name: "transferQuantity",
            type: dbService.TYPES.Int,
            value: transfer.transferQuantity,
        },
        {
            name: "sentDate",
            type: dbService.TYPES.Date,
            value: transfer.sentDate,
        },
        {
            name: "receivedDate",
            type: dbService.TYPES.Date,
            value: transfer.receivedDate,
        },
        {
            name: "productId",
            type: dbService.TYPES.Int,
            value: transfer.productId,
        },
        {
            name: "sourceWarehouseId",
            type: dbService.TYPES.Int,
            value: transfer.sourceWarehouseId,
        },
        {
            name: "destinationWarehouseId",
            type: dbService.TYPES.Int,
            value: transfer.destinationWarehouseId,
        },
    ];
    return await dbService.executeQuery(query, params);
}

async function deleteTransfer(transferId) {
    const query = `
        DELETE FROM Transfer
        WHERE TransferID = @transferId;
    `;
    const params = [
        { name: "transferId", type: dbService.TYPES.Int, value: transferId },
    ];
    return await dbService.executeQuery(query, params);
}

module.exports = {
    getAllTransfers,
    getTransferById,
    addTransfer,
    updateTransfer,
    deleteTransfer,
};
