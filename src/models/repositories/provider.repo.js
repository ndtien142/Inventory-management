"use strict";

const db = require("../../dbs/init.sqlserver");

const getProviderById = async (providerId) => {
    return await db.Provider.findByPk(providerId);
};

const getProviderByNameAndId = async ({ name, id }) => {
    return await db.Provider.findOne({ where: { name, id } });
};

const getAllProviders = async ({ offset = 0, limit = 20 }) => {
    return await db.Provider.findAndCountAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
    });
};

const createNewProvider = async ({ name, contactInfo, isActive }) => {
    return await db.Provider.create({
        name,
        contact_info: JSON.stringify(contactInfo),
        is_active: isActive,
        create_time: new Date(),
        update_time: new Date(),
    });
};

const updateProvider = async (providerId, { name, contactInfo, isActive }) => {
    const provider = await getProviderById(providerId);

    provider.name = name || provider.name;
    provider.contact_info = JSON.stringify(
        contactInfo || JSON.parse(provider.contact_info)
    );
    provider.is_active = isActive !== undefined ? isActive : provider.is_active;
    provider.update_time = new Date();

    return await provider.save();
};

module.exports = {
    getProviderById,
    getProviderByNameAndId,
    createNewProvider,
    updateProvider,
    getAllProviders,
};
