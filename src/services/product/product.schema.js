const Joi = require("joi");

const updateProductSchema = () => {
    return Joi.object({
        productName: Joi.string(),
        productDesc: Joi.string(),
        productStatus: Joi.string().valid("available", "unavailable"),
        productAttrs: Joi.array().items(
            Joi.object({
                attrName: Joi.string().required(),
                attrValue: Joi.string().required(),
            })
        ),
        thumbnail: Joi.string().uri(),
        sort: Joi.number().integer(),
        isActive: Joi.boolean(),
        isDeleted: Joi.boolean(),
        brand: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string(),
        }),
        category: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string(),
        }),
        unitConversion: Joi.array().items(
            Joi.object({
                id: Joi.number().integer(),
                baseUnit: Joi.object({
                    id: Joi.number().integer().required(),
                    name: Joi.string(),
                }).required(),
                conversionUnit: Joi.object({
                    id: Joi.number().integer().required(),
                    name: Joi.string(),
                }).required(),
                rateConversion: Joi.number(),
            })
        ),
        sku: Joi.array().items(
            Joi.object({
                skuNo: Joi.string().required(),
                skuName: Joi.string(),
                skuDescription: Joi.string(),
                skuImage: Joi.string().uri(),
                isDefault: Joi.boolean(),
                isDeleted: Joi.boolean(),
                price: Joi.number(),
                unit: Joi.object({
                    id: Joi.number().integer().required(),
                    name: Joi.string(),
                }),
                stock: Joi.number().integer(),
            })
        ),
    });
};

const createNewProductSchema = () => {
    return Joi.object({
        productName: Joi.string().required(),
        productDesc: Joi.string().required(),
        productStatus: Joi.string()
            .valid("available", "unavailable")
            .required(),
        productAttrs: Joi.array()
            .items(
                Joi.object({
                    attrName: Joi.string().required(),
                    attrValue: Joi.string().required(),
                })
            )
            .required(),
        thumbnail: Joi.string().uri().required(),
        sort: Joi.number().integer().required(),
        isActive: Joi.boolean().default(true),
        isDeleted: Joi.boolean().default(false),
        brand: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().required(),
        }).required(),
        category: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().required(),
        }).required(),
        unitConversion: Joi.array()
            .items(
                Joi.object({
                    baseUnit: Joi.object({
                        id: Joi.number().integer().required(),
                        name: Joi.string().required(),
                    }).required(),
                    conversionUnit: Joi.object({
                        id: Joi.number().integer().required(),
                        name: Joi.string().required(),
                    }).required(),
                    rateConversion: Joi.number().required(),
                })
            )
            .required(),
        sku: Joi.array()
            .items(
                Joi.object({
                    skuName: Joi.string().required(),
                    skuDescription: Joi.string().required(),
                    skuImage: Joi.string().uri().required(),
                    isDefault: Joi.boolean().default(false),
                    isDeleted: Joi.boolean().default(false),
                    price: Joi.number().required(),
                    unit: Joi.object({
                        id: Joi.number().integer().required(),
                        name: Joi.string().required(),
                    }).required(),
                })
            )
            .required(),
    });
};

module.exports = {
    updateProductSchema,
    createNewProductSchema,
};
