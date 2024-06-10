const dbService = require("../services/database.service");

async function getAllDeliveries() {
    const query = `
        SELECT * FROM Delivery;
    `;
    return await dbService.executeQuery(query);
}

async function getDeliveryById(deliveryId) {
    const query = `
        SELECT * FROM Delivery
        WHERE DeliveryID = @deliveryId;
    `;
    const params = [
        { name: "deliveryId", type: dbService.TYPES.Int, value: deliveryId },
    ];
    return await dbService.executePreparedStatement(query, params);
}

async function getDeliveryByIdWithDetails(deliveryId) {
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
    return await dbService.executePreparedStatement(query, params);
}

async function addDelivery(delivery) {
    const query = `
        INSERT INTO Delivery (SalesDate, Customer_CustomerID)
        VALUES (@salesDate, @customerId);
    `;
    const params = [
        {
            name: "salesDate",
            type: dbService.TYPES.Date, // Assuming salesDate is a Date type
            value: delivery.salesDate,
        },
        {
            name: "customerId",
            type: dbService.TYPES.Int,
            value: delivery.customerId,
        },
    ];
    return await dbService.executePreparedStatement(query, params);
}

async function updateDelivery(deliveryId, delivery) {
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
            type: dbService.TYPES.Date,
            value: delivery.salesDate,
        },
        {
            name: "customerId",
            type: dbService.TYPES.Int,
            value: delivery.customerId,
        },
    ];
    return await dbService.executePreparedStatement(query, params);
}

async function deleteDelivery(deliveryId) {
    const query = `
        DELETE FROM Delivery
        WHERE DeliveryID = @deliveryId;
    `;
    const params = [
        { name: "deliveryId", type: dbService.TYPES.Int, value: deliveryId },
    ];
    return await dbService.executePreparedStatement(query, params);
}

module.exports = {
    getAllDeliveries,
    getDeliveryById,
    getDeliveryByIdWithDetails,
    addDelivery,
    updateDelivery,
    deleteDelivery,
};
