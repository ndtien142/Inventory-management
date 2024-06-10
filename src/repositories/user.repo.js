const dbService = require("../services/database.service");

function getAllCustomers(callback) {
    const query = `
        SELECT * FROM Customer;
    `;
    dbService.executeQuery(query, callback);
}

function getCustomerById(customerId, callback) {
    const query = `
        SELECT * FROM Customer
        WHERE CustomerID = @customerId;
    `;
    const params = [
        { name: "customerId", type: dbService.TYPES.Int, value: customerId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addCustomer(customer, callback) {
    const query = `
        INSERT INTO Customer (CustomerName, CustomerAddress)
        VALUES (@customerName, @customerAddress);
    `;
    const params = [
        {
            name: "customerName",
            type: dbService.TYPES.VarChar,
            value: customer.customerName,
        },
        {
            name: "customerAddress",
            type: dbService.TYPES.VarChar,
            value: customer.customerAddress,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateCustomer(customerId, customer, callback) {
    const query = `
        UPDATE Customer
        SET CustomerName = @customerName,
            CustomerAddress = @customerAddress
        WHERE CustomerID = @customerId;
    `;
    const params = [
        { name: "customerId", type: dbService.TYPES.Int, value: customerId },
        {
            name: "customerName",
            type: dbService.TYPES.VarChar,
            value: customer.customerName,
        },
        {
            name: "customerAddress",
            type: dbService.TYPES.VarChar,
            value: customer.customerAddress,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteCustomer(customerId, callback) {
    const query = `
        DELETE FROM Customer
        WHERE CustomerID = @customerId;
    `;
    const params = [
        { name: "customerId", type: dbService.TYPES.Int, value: customerId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
};
