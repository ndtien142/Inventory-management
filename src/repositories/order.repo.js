const dbService = require("../services/database.service");

async function getAllOrders() {
    const query = `
        SELECT * FROM "Order";
    `;
    return await dbService.executeQuery(query);
}

async function getOrderById(orderId) {
    const query = `
        SELECT * FROM "Order"
        WHERE OrderID = @orderId;
    `;
    const params = [
        { name: "orderId", type: dbService.TYPES.Int, value: orderId },
    ];
    return await dbService.executeQuery(query, params);
}

async function getOrderByIdWithDetails(orderId) {
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
    return await dbService.executeQuery(query, params);
}

async function addOrder(order) {
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
    return await dbService.executeQuery(query, params);
}

async function updateOrder(orderId, order) {
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
    return await dbService.executeQuery(query, params);
}

async function deleteOrder(orderId) {
    const query = `
        DELETE FROM "Order"
        WHERE OrderID = @orderId;
    `;
    const params = [
        { name: "orderId", type: dbService.TYPES.Int, value: orderId },
    ];
    return await dbService.executeQuery(query, params);
}

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByIdWithDetails,
    addOrder,
    updateOrder,
    deleteOrder,
};
