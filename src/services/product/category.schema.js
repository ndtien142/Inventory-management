const Joi = require("joi");

const createCategorySchema = () => {
    return Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().required(),
        parentCategoryId: Joi.number(),
    });
};

module.exports = { createCategorySchema };
