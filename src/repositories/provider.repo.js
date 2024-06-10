const dbService = require("../services/database.service");

function getAllProviders(callback) {
    const query = `
        SELECT * FROM Provider;
    `;
    dbService.executeQuery(query, callback);
}

function getProviderById(providerId, callback) {
    const query = `
        SELECT * FROM Provider
        WHERE ProviderID = @providerId;
    `;
    const params = [
        { name: "providerId", type: dbService.TYPES.Int, value: providerId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addProvider(provider, callback) {
    const query = `
        INSERT INTO Provider (ProviderName, ProviderAddress)
        VALUES (@providerName, @providerAddress);
    `;
    const params = [
        {
            name: "providerName",
            type: dbService.TYPES.VarChar,
            value: provider.providerName,
        },
        {
            name: "providerAddress",
            type: dbService.TYPES.VarChar,
            value: provider.providerAddress,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateProvider(providerId, provider, callback) {
    const query = `
        UPDATE Provider
        SET ProviderName = @providerName,
            ProviderAddress = @providerAddress
        WHERE ProviderID = @providerId;
    `;
    const params = [
        { name: "providerId", type: dbService.TYPES.Int, value: providerId },
        {
            name: "providerName",
            type: dbService.TYPES.VarChar,
            value: provider.providerName,
        },
        {
            name: "providerAddress",
            type: dbService.TYPES.VarChar,
            value: provider.providerAddress,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteProvider(providerId, callback) {
    const query = `
        DELETE FROM Provider
        WHERE ProviderID = @providerId;
    `;
    const params = [
        { name: "providerId", type: dbService.TYPES.Int, value: providerId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllProviders,
    getProviderById,
    addProvider,
    updateProvider,
    deleteProvider,
};
