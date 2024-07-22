"use strict";

const Joi = require("joi");

const createNewPurchaseSchema = () => {
    return Joi.object({
        provider: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().required(),
        }).required(),
        expectedArrivalDate: Joi.date().required(),
        details: Joi.array()
            .items(
                Joi.object({
                    skuNo: Joi.string().required(),
                    quantity: Joi.number().integer().required(),
                    unitPrice: Joi.number().precision(2).required(),
                })
            )
            .required(),
    });
};

module.exports = {
    createNewPurchaseSchema,
};
