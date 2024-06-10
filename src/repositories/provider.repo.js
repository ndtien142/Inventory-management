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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function getProviderByName(providerName) {
    const query = `
        SELECT * FROM Provider
        WHERE ProviderName = @providerName;
    `;
    const params = [
        {
            name: "providerName",
            type: dbService.TYPES.VarChar,
            value: providerName,
        },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function addProvider(provider) {
    const query = `
        INSERT INTO Provider (ProviderName, ProviderAddress)
        OUTPUT INSERTED.*
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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function updateProvider(providerId, provider) {
    const query = `
        UPDATE Provider
        SET ProviderName = @providerName,
            ProviderAddress = @providerAddress
        OUTPUT INSERTED.*
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
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

async function deleteProvider(providerId) {
    const query = `
        DELETE FROM Provider
        OUTPUT DELETED.*
        WHERE ProviderID = @providerId;
    `;
    const params = [
        { name: "providerId", type: dbService.TYPES.Int, value: providerId },
    ];
    const result = await dbService.executeQuery(query, params);
    return result[0];
}

module.exports = {
    getAllProviders,
    getProviderById,
    getProviderByName,
    addProvider,
    updateProvider,
    deleteProvider,
};
