"use strict";

const apiKeyModel = require("../../models/authentication/apikey.model");

const findById = async (key) => {
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return objKey;
};

module.exports = {
    findById,
};
