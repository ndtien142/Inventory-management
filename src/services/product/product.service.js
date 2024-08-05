const { BadRequestError, NotFoundError } = require("../../core/error.response");
const db = require("../../dbs/init.sqlserver");
const {
    createNewProduct,
    getDetailProduct,
    findAllProduct,
    findAllSKUProduct,
} = require("../../models/repositories/product.repo");
const {
    createNewProductSchema,
    updateProductSchema,
} = require("./product.schema");
const { updateNestedObject } = require("../../utils");
const { getBrandById } = require("../../models/repositories/brand.repo");
const { getCategoryById } = require("../../models/repositories/category.repo");

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
        const { error, value } = createNewProductSchema().validate({
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
                isActive: !!product.is_active,
                isDeleted: !!product.is_deleted,
                brand: {
                    id: product.brand.id,
                    name: product.brand.brand_name,
                },
                category: {
                    id: product.category.id,
                    name: product.category.name,
                },
                sku: product.sku.map((item) => {
                    return {
                        skuNo: item.sku_no,
                        price: item.price,
                        stock: item.stock,
                        isDefault: item.is_default,
                        isDeleted: item.is_deleted,
                        unit: {
                            id: item.unit.id,
                            name: item.unit.name,
                        },
                    };
                }),
            })),
            meta: {
                currentPage: page,
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
                id: uc.id,
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
                isDefault: !!sku.is_default,
                isDeleted: !!sku.is_deleted,
                price: sku.price,
                unit: {
                    id: sku.unit.id,
                    name: sku.unit.name,
                },
                stock: sku.stock,
            })),
        };
    };
    static updateProduct = async (
        productId,
        {
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
        }
    ) => {
        const { error, value } = updateProductSchema().validate({
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
            const foundProduct = await getDetailProduct(productId);
            if (!foundProduct) {
                throw new Error("Product not found");
            }
            await foundProduct.update(
                {
                    product_name:
                        value.productName || foundProduct.product_name,
                    product_desc:
                        value.productDesc || foundProduct.product_desc,
                    product_status: value.productStatus === "available" ? 1 : 0,
                    product_attrs: JSON.stringify(
                        value.productAttrs || foundProduct.product_attrs
                    ),
                    thumbnail: value.thumbnail || foundProduct.thumbnail,
                    sort: value.sort || foundProduct.sort,
                    is_active: value.isActive || foundProduct.is_active,
                    is_deleted: value.isDeleted || foundProduct.is_deleted,
                    update_time: new Date(),
                },
                { transaction }
            );
            if (value.brand) {
                const brand = await getBrandById(parseInt(value.brand.id), {
                    transaction,
                });
                if (!brand) {
                    throw new NotFoundError("Brand not found");
                }
                foundProduct.product_brand_id = brand.id;
            }

            if (value.category) {
                const category = await getCategoryById(value.category.id, {
                    transaction,
                });
                if (!category) {
                    throw new NotFoundError("Category not found");
                }
                foundProduct.product_category_id = category.id;
            }

            if (value.unitConversion) {
                for (const uc of value.unitConversion) {
                    if (uc.id) {
                        const unitConversion = await db.UnitConversion.findByPk(
                            uc.id,
                            { transaction }
                        );
                        if (!unitConversion) {
                            throw new Error("Unit conversion not found");
                        }
                        await unitConversion.update(
                            {
                                base_unit_id: uc.baseUnit.id,
                                conversion_unit_id: uc.conversionUnit.id,
                                rate_conversion: uc.rateConversion,
                                update_time: new Date(),
                            },
                            { transaction }
                        );
                    } else {
                        const existingConversion =
                            await db.UnitConversion.findOne({
                                where: {
                                    base_unit_id: uc.baseUnit.id,
                                    conversion_unit_id: uc.conversionUnit.id,
                                    fk_product_id: productId,
                                    update_time: new Date(),
                                },
                                transaction,
                            });

                        if (existingConversion) {
                            await existingConversion.update(
                                {
                                    rate_conversion: uc.rateConversion,
                                },
                                { transaction }
                            );
                        } else {
                            const baseUnit = await db.Unit.findByPk(
                                uc.baseUnit.id,
                                { transaction }
                            );
                            if (!baseUnit) {
                                throw new NotFoundError("Base unit not found");
                            }

                            const conversionUnit = await db.Unit.findByPk(
                                uc.conversionUnit.id,
                                { transaction }
                            );
                            if (!conversionUnit) {
                                throw new NotFoundError(
                                    "Conversion unit not found"
                                );
                            }

                            await db.UnitConversion.create(
                                {
                                    base_unit_id: uc.baseUnit.id,
                                    conversion_unit_id: uc.conversionUnit.id,
                                    rate_conversion: uc.rateConversion,
                                    fk_product_id: productId,
                                    create_time: new Date(),
                                    update_time: new Date(),
                                },
                                { transaction }
                            );
                        }
                    }
                }
            }

            if (value.sku) {
                for (const skuData of value.sku) {
                    let sku = await db.SKU.findOne({
                        where: {
                            fk_product_id: productId,
                            sku_no: skuData.skuNo,
                        },
                        transaction,
                    });

                    if (sku) {
                        await sku.update(
                            {
                                // sku_name: skuData.skuName || skuData.sku_name,
                                is_default:
                                    skuData.isDefault !== undefined
                                        ? !!skuData.isDefault
                                        : sku.is_default,
                                is_deleted:
                                    skuData.isDeleted !== undefined
                                        ? !!skuData.isDeleted
                                        : sku.is_deleted,
                                price: skuData.price || sku.price,
                                stock: skuData.stock || sku.stock,
                                fk_unit_id: skuData.unit.id || sku.unit.id,
                                // sku_image: skuData.skuImage || sku.sku_image,
                            },
                            { transaction }
                        );
                    } else {
                        await db.SKU.create(
                            {
                                // sku_name: skuData.skuName,
                                price: skuData.price,
                                stock: skuData.stock,
                                // sku_image: skuData.skuImage,
                                fk_product_id: productId,
                                fk_unit_id: skuData.unit.id,
                                is_default: !!skuData.isDefault,
                                is_deleted: !!skuData.isDeleted,
                                create_time: new Date(),
                                update_time: new Date(),
                            },
                            { transaction }
                        );
                    }
                }
            }

            await foundProduct.save();

            await transaction.commit();

            const updateProduct = await getDetailProduct(productId);

            return {
                productId: updateProduct.product_id,
                productName: updateProduct.product_name,
                productDesc: updateProduct.product_desc,
                productStatus:
                    updateProduct.product_status === 1
                        ? "available"
                        : "unavailable",
                productAttrs: JSON.parse(updateProduct.product_attrs),
                thumbnail: updateProduct.thumbnail,
                sort: updateProduct.sort,
                isActive: updateProduct.is_active,
                isDeleted: updateProduct.is_deleted,
                brand: {
                    id: updateProduct.brand.id,
                    name: updateProduct.brand.brand_name,
                },
                category: {
                    id: updateProduct.category.id,
                    name: updateProduct.category.name,
                },
                unitConversion: updateProduct.unitConversion.map((uc) => ({
                    id: uc.id,
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
                sku: updateProduct.sku.map((sku) => ({
                    skuNo: sku.sku_no,
                    // skuName: sku.sku_name,
                    // skuDescription: sku.sku_description,
                    // skuImage: sku.sku_image,
                    isDefault: !!sku.is_default,
                    isDeleted: !!sku.is_deleted,
                    price: sku.price,
                    unit: {
                        id: sku.unit.id,
                        name: sku.unit.name,
                    },
                    stock: sku.stock,
                })),
            };
        } catch (err) {
            await transaction.rollback();
            throw new Error(`Failed to update product: ${err.message}`);
        }
    };
    static deleteProduct = async (productId) => {
        // delete product from database by id
        // return deleted product
    };
    static editStatusProduct = async (productId) => {
        const foundProduct = await getDetailProduct(productId);
        if (!foundProduct) {
            throw new NotFoundError("Product not found");
        }
        foundProduct.is_active = !foundProduct.is_active;

        await foundProduct.save();

        return foundProduct;
    };
    static getListSKUProduct = async ({ page, limit }) => {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { rows: skus, count } = await findAllSKUProduct({
            offset,
            limit: parseInt(limit),
        });
        return {
            items: skus.map((sku) => {
                return {
                    skuNo: sku.sku_no,
                    // skuName: sku.sku_name,
                    // skuDescription: sku.sku_description,
                    price: sku.price,
                    stock: sku.stock,
                    // skuImage: sku.sku_image,
                    unit: {
                        id: sku.unit.id,
                        name: sku.unit.name,
                    },
                    product: {
                        id: sku.product.product_id,
                        name: sku.product.product_name,
                    },
                    isDefault: !!sku.is_default,
                    isDeleted: !!sku.is_deleted,
                };
            }),
            meta: {
                currentPage: parseInt(page),
                itemsPerPage: parseInt(limit),
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    };
}

module.exports = ProductService;
