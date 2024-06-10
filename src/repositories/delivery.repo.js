const dbService = require("../services/database.service");

function getAllDeliveries(callback) {
    const query = `
        SELECT * FROM Delivery;
    `;
    dbService.executeQuery(query, callback);
}

function getDeliveryById(deliveryId, callback) {
    const query = `
        SELECT * FROM Delivery
        WHERE DeliveryID = @deliveryId;
    `;
    const params = [
        { name: "deliveryId", type: dbService.TYPES.Int, value: deliveryId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function getDeliveryByIdWithDetails(deliveryId, callback) {
    const query = `
        SELECT d.DeliveryID, d.SalesDate, d.Customer_CustomerID,
               dd.DeliveryDetailID, dd.DeliveryQuantity, dd.ExpectedDate, dd.ActualDate,
               dd.Warehouse_WarehouseID, dd.Product_ProductId
        FROM Delivery d
        INNER JOIN DeliveryDetail dd ON d.DeliveryID = dd.Delivery_DeliveryID
        WHERE d.DeliveryID = @deliveryId;
    `;
    const params = [
        { name: "deliveryId", type: dbService.TYPES.Int, value: deliveryId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addDelivery(delivery, callback) {
    const query = `
        INSERT INTO Delivery (SalesDate, Customer_CustomerID)
        VALUES (@salesDate, @customerId);
    `;
    const params = [
        {
            name: "salesDate",
            type: dbService.TYPES.Int,
            value: delivery.salesDate,
        },
        {
            name: "customerId",
            type: dbService.TYPES.Int,
            value: delivery.customerId,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateDelivery(deliveryId, delivery, callback) {
    const query = `
        UPDATE Delivery
        SET SalesDate = @salesDate,
            Customer_CustomerID = @customerId
        WHERE DeliveryID = @deliveryId;
    `;
    const params = [
        { name: "deliveryId", type: dbService.TYPES.Int, value: deliveryId },
        {
            name: "salesDate",
            type: dbService.TYPES.Int,
            value: delivery.salesDate,
        },
        {
            name: "customerId",
            type: dbService.TYPES.Int,
            value: delivery.customerId,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteDelivery(deliveryId, callback) {
    const query = `
        DELETE FROM Delivery
        WHERE DeliveryID = @deliveryId;
    `;
    const params = [
        { name: "deliveryId", type: dbService.TYPES.Int, value: deliveryId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllDeliveries,
    getDeliveryById,
    getDeliveryByIdWithDetails,
    addDelivery,
    updateDelivery,
    deleteDelivery,
};
