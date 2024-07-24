const Joi = require("joi");

const createBrandSchema = () => {
    return Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    });
};

module.exports = { createBrandSchema };
