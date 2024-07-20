const { BadRequestError, NotFoundError } = require("../../core/error.response");
const Joi = require("joi");
const db = require("../../dbs/init.sqlserver");
const {
    createNewProduct,
    getDetailProduct,
    findAllProduct,
} = require("../../models/repositories/product.repo");

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

        const result = await createNewProduct({
            productName,
            productDesc,
            productStatus,
            productAttrs,
            thumbnail,
            sort,
            isActive,
            isDeleted,
            unitConversion,
            sku,
            brand,
            category,
        });

        return result;
    };
    static getListProduct = async ({ page = 1, limit = 20 }) => {
        const offset = (page - 1) * limit;
        const { rows: products, count } = await findAllProduct({
            offset: offset,
            limit: limit,
        });

        return {
            items: products.map((product) => ({
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
            })),
            meta: {
                itemCount: products.length,
                itemsPerPage: parseInt(limit),
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    };
    static getProductDetails = async (productId) => {
        const product = await getDetailProduct(productId);

        if (!product) {
            throw new NotFoundError("Product not found");
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
