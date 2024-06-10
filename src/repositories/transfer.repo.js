const dbService = require("../services/database.service");

function getAllTransfers(callback) {
    const query = `
        SELECT * FROM Transfer;
    `;
    dbService.executeQuery(query, callback);
}

function getTransferById(transferId, callback) {
    const query = `
        SELECT * FROM Transfer
        WHERE TransferID = @transferId;
    `;
    const params = [
        { name: "transferId", type: dbService.TYPES.Int, value: transferId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addTransfer(transfer, callback) {
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
    dbService.executePreparedStatement(query, params, callback);
}

function updateTransfer(transferId, transfer, callback) {
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
    dbService.executePreparedStatement(query, params, callback);
}

function deleteTransfer(transferId, callback) {
    const query = `
        DELETE FROM Transfer
        WHERE TransferID = @transferId;
    `;
    const params = [
        { name: "transferId", type: dbService.TYPES.Int, value: transferId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllTransfers,
    getTransferById,
    addTransfer,
    updateTransfer,
    deleteTransfer,
};
