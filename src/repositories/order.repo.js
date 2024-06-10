const dbService = require("../services/database.service");

function getAllOrders(callback) {
    const query = `
        SELECT * FROM "Order";
    `;
    dbService.executeQuery(query, callback);
}

function getOrderById(orderId, callback) {
    const query = `
        SELECT * FROM "Order"
        WHERE OrderID = @orderId;
    `;
    const params = [
        { name: "orderId", type: dbService.TYPES.Int, value: orderId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function getOrderByIdWithDetails(orderId, callback) {
    const query = `
        SELECT o.OrderID, o.OrderDate, o.Provider_ProviderID,
               od.OrderDetailID, od.OrderQuantity, od.ExpectedDate, od.ActualDate,
               od.Product_ProductId, od.Warehouse_WarehouseID
        FROM "Order" o
        INNER JOIN OrderDetail od ON o.OrderID = od.Order_OrderID
        WHERE o.OrderID = @orderId;
    `;
    const params = [
        { name: "orderId", type: dbService.TYPES.Int, value: orderId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addOrder(order, callback) {
    const query = `
        INSERT INTO "Order" (OrderDate, Provider_ProviderID)
        VALUES (@orderDate, @providerId);
    `;
    const params = [
        {
            name: "orderDate",
            type: dbService.TYPES.Date,
            value: order.orderDate,
        },
        {
            name: "providerId",
            type: dbService.TYPES.Int,
            value: order.providerId,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateOrder(orderId, order, callback) {
    const query = `
        UPDATE "Order"
        SET OrderDate = @orderDate,
            Provider_ProviderID = @providerId
        WHERE OrderID = @orderId;
    `;
    const params = [
        { name: "orderId", type: dbService.TYPES.Int, value: orderId },
        {
            name: "orderDate",
            type: dbService.TYPES.Date,
            value: order.orderDate,
        },
        {
            name: "providerId",
            type: dbService.TYPES.Int,
            value: order.providerId,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteOrder(orderId, callback) {
    const query = `
        DELETE FROM "Order"
        WHERE OrderID = @orderId;
    `;
    const params = [
        { name: "orderId", type: dbService.TYPES.Int, value: orderId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByIdWithDetails,
    addOrder,
    updateOrder,
    deleteOrder,
};
