const dbService = require("../services/database.service");

async function getAllCustomers() {
    const query = `SELECT * FROM Customer;`;
    return await dbService.executeQuery(query);
}

async function getCustomerById(customerId) {
    const query = `SELECT * FROM Customer WHERE CustomerID = @customerId;`;
    const params = [
        { name: "customerId", type: dbService.TYPES.Int, value: customerId },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function getCustomerByName(customerName) {
    const query = `SELECT CustomerID, CustomerName, CustomerAddress FROM Customer WHERE CustomerName = @customerName;`;
    const params = [
        {
            name: "customerName",
            type: dbService.TYPES.VarChar,
            value: customerName,
        },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function addCustomer(customer) {
    const query = `
        INSERT INTO Customer (CustomerName, CustomerAddress)
        OUTPUT INSERTED.*
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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function updateCustomer(customerId, customer) {
    const query = `
        UPDATE Customer
        SET CustomerName = @customerName,
            CustomerAddress = @customerAddress
        OUTPUT INSERTED.*
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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function deleteCustomer(customerId) {
    const query = `
        DELETE FROM Customer
        OUTPUT DELETED.*
        WHERE CustomerID = @customerId;
    `;
    const params = [
        { name: "customerId", type: dbService.TYPES.Int, value: customerId },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByName,
    addCustomer,
    updateCustomer,
    deleteCustomer,
};
