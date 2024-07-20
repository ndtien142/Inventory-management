const { BadRequestError } = require("../../core/error.response");
const Joi = require("joi");
const slugify = require("slugify");
const db = require("../../dbs/init.sqlserver");

class ProductService {
    static createProduct = async ({
        productName,
        productDesc,
        productStatus,
        productAttrs,
        thumbnail,
        sort,
        isActive = true,
        isDeleted = false,
        brand = {},
        category = {},
        unitConversion = [],
        sku = [],
    }) => {
        const schema = Joi.object({
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
                            rateConversion: Joi.number().required(),
                        }).required(),
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

        const { error, value } = schema.validate({
            productName,
            productDesc,
            productStatus,
            productAttrs,
            thumbnail,
            sort,
            isActive,
            isDeleted,
            brand,
            category,
            unitConversion,
            sku,
        });

        if (error) {
            throw new BadRequestError(
                `Validation error: ${error.details.map((x) => x.message).join(", ")}`
            );
        }
        const transaction = await db.sequelize.transaction();

        try {
            const slug = slugify(productName, { lower: true, strict: true });
            const productId = slug;
            const product = await db.Product.create(
                {
                    product_id: productId,
                    product_name: productName,
                    product_desc: productDesc,
                    product_status: productStatus === "available" ? 1 : 0,
                    product_attrs: JSON.stringify(productAttrs),
                    thumbnail,
                    sort,
                    is_active: isActive,
                    is_deleted: isDeleted,
                    product_brand_id: brand.id,
                    product_category_id: category.id,
                },
                { transaction }
            );

            const units = {};
            for (const unit of unitConversion) {
                if (!units[unit.baseUnit.id]) {
                    units[unit.baseUnit.id] = await db.Unit.findOrCreate({
                        where: { id: unit.baseUnit.id },
                        defaults: { name: unit.baseUnit.name },
                        transaction,
                    }).then(([unit]) => unit);
                }
                if (!units[unit.conversionUnit.id]) {
                    units[unit.conversionUnit.id] = await db.Unit.findOrCreate({
                        where: { id: unit.conversionUnit.id },
                        defaults: { name: unit.conversionUnit.name },
                        transaction,
                    }).then(([unit]) => unit);
                }
                await db.UnitConversion.create(
                    {
                        base_unit_id: unit.baseUnit.id,
                        conversion_unit_id: unit.conversionUnit.id,
                        rate_conversion: unit.conversionUnit.rateConversion,
                        fk_product_id: product.product_id,
                        is_deleted: false,
                    },
                    { transaction }
                );
            }
            for (const item of sku) {
                const skuNo = `${product.product_id}-${slugify(item.skuName, { lower: true, strict: true })}`;

                if (!units[item.unit.id]) {
                    units[item.unit.id] = await db.Unit.findOrCreate({
                        where: { id: item.unit.id },
                        defaults: { name: item.unit.name },
                        transaction,
                    }).then(([unit]) => unit);
                }

                await db.SKU.create(
                    {
                        sku_no: skuNo,
                        fk_product_id: product.product_id,
                        sku_name: item.skuName,
                        sku_description: item.skuDescription,
                        sku_image: item.skuImage,
                        is_default: item.isDefault,
                        is_deleted: item.isDeleted,
                        fk_unit_id: item.unit.id,
                        price: item.price,
                        stock: 0,
                    },
                    { transaction }
                );
            }

            await transaction.commit();

            return product;
        } catch (error) {
            await transaction.rollback();
            throw new BadRequestError(
                `Failed to create product: ${error.message}`
            );
        }
    };
    static getAllProducts = async () => {
        // fetch all products from database
        // return products
    };
    static getProductDetails = async (productId) => {
        try {
            const product = await db.Product.findOne({
                where: { product_id: productId },
                include: [
                    {
                        model: db.Brand,
                        as: "brand",
                        attributes: ["id", "brand_name"],
                    },
                    {
                        model: db.Category,
                        as: "category",
                        attributes: ["id", "name"],
                    },
                    {
                        model: db.UnitConversion,
                        as: "unitConversion",
                        include: [
                            {
                                model: db.Unit,
                                as: "baseUnit",
                                attributes: ["id", "name"],
                            },
                            {
                                model: db.Unit,
                                as: "conversionUnit",
                                attributes: ["id", "name"],
                            },
                        ],
                    },
                    {
                        model: db.SKU,
                        as: "sku",
                        include: [
                            {
                                model: db.Unit,
                                as: "unit",
                                attributes: ["id", "name"],
                            },
                        ],
                    },
                ],
            });

            if (!product) {
                throw new Error("Product not found");
            }

            return {
                productId: product.product_id,
                productName: product.product_name,
                productDesc: product.product_desc,
                productStatus:
                    product.product_status === 1 ? "available" : "unavailable",
                productAttrs: JSON.parse(product.product_attrs),
                thumbnail: product.thumbnail,
                sort: product.sort,
                isActive: product.is_active,
                isDeleted: product.is_deleted,
                brand: {
                    id: product.brand.id,
                    name: product.brand.brand_name,
                },
                category: {
                    id: product.category.id,
                    name: product.category.name,
                },
                unitConversion: product.unitConversion.map((uc) => ({
                    baseUnit: {
                        id: uc.baseUnit.id,
                        name: uc.baseUnit.name,
                    },
                    conversionUnit: {
                        id: uc.conversionUnit.id,
                        name: uc.conversionUnit.name,
                    },
                    rateConversion: uc.rate_conversion,
                })),
                sku: product.sku.map((sku) => ({
                    skuNo: sku.sku_no,
                    skuName: sku.sku_name,
                    skuDescription: sku.sku_description,
                    skuImage: sku.sku_image,
                    isDefault: sku.is_default,
                    isDeleted: sku.is_deleted,
                    price: sku.price,
                    unit: {
                        id: sku.unit.id,
                        name: sku.unit.name,
                    },
                    stock: sku.stock,
                })),
            };
        } catch (error) {
            throw new Error(`Failed to get product details: ${error.message}`);
        }
    };
    static updateProduct = async (productId, {}) => {
        // update product in database by id
        // return updated product
    };
    static deleteProduct = async (productId) => {
        // delete product from database by id
        // return deleted product
    };
}

module.exports = ProductService;
