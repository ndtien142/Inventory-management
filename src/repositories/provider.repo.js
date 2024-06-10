const dbService = require("../services/database.service");

async function getAllProviders() {
    const query = `SELECT * FROM Provider;`;
    return await dbService.executeQuery(query);
}

async function getProviderById(providerId) {
    const query = `
        SELECT * FROM Provider
        WHERE ProviderID = @providerId;
    `;
    const params = [
        { name: "providerId", type: dbService.TYPES.Int, value: providerId },
    ];
    return await dbService.executeQuery(query, params);
}

async function addProvider(provider) {
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
    return await dbService.executeQuery(query, params);
}

async function updateProvider(providerId, provider) {
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
    return await dbService.executeQuery(query, params);
}

async function deleteProvider(providerId) {
    const query = `
        DELETE FROM Provider
        WHERE ProviderID = @providerId;
    `;
    const params = [
        { name: "providerId", type: dbService.TYPES.Int, value: providerId },
    ];
    return await dbService.executeQuery(query, params);
}

module.exports = {
    getAllProviders,
    getProviderById,
    addProvider,
    updateProvider,
    deleteProvider,
};
