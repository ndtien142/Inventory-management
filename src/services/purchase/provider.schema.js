"use strict";

const Joi = require("joi");

const createNewProviderSchema = () => {
    return Joi.object({
        name: Joi.string().required(),
        contactInfo: Joi.string().required(),
        isActive: Joi.boolean().required(),
    });
};

module.exports = {
    createNewProviderSchema,
};
