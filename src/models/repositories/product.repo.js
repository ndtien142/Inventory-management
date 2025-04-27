"use strict";

const { BadRequestError } = require("../../core/error.response");
const db = require("../../dbs/init.sqlserver");
const { Op } = require("sequelize");
const slugify = require("slugify");

const createNewProduct = async ({
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
                    rate_conversion: unit.rateConversion,
                    fk_product_id: product.product_id,
                    is_deleted: false,
                },
                { transaction }
            );
        }
        for (const item of sku) {
            const skuNo = `${product.product_id}-${item.unit.name}`;

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
                    price: item.price,
                    stock: 0,
                    is_default: item.isDefault,
                    is_deleted: item.isDeleted,
                    fk_unit_id: item.unit.id,
                    // sku_name: item.skuName,
                    // sku_description: item.skuDescription,
                    // sku_image: item.skuImage,
                },
                { transaction }
            );
        }

        await transaction.commit();

        return product;
    } catch (error) {
        await transaction.rollback();
        throw new BadRequestError(`Failed to create product: ${error.message}`);
    }
};

const getDetailProduct = async (productId) => {
    return await db.Product.findOne({
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
};

const findAllProduct = async ({ limit = 20, offset = 0, searchText = "" }) => {
    let whereCondition = {};
    if (searchText) {
        whereCondition.product_name = {
            [Op.like]: `%${searchText}%`,
        };
    }
    return await db.Product.findAndCountAll({
        limit: parseInt(limit),
        where: whereCondition,
        offset: parseInt(offset),
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
};

const getProductSku = async (skuNo) => {
    return await db.SKU.findByPk(skuNo);
};

const findAllSKUProduct = async ({ offset = 0, limit = 20 }) => {
    return await db.SKU.findAndCountAll({
        where: {
            is_deleted: false,
        },
        offset,
        limit,
        include: [
            {
                model: db.Product,
                as: "product",
                attributes: ["product_id", "product_name"],
            },
            {
                model: db.Unit,
                as: "unit",
                attributes: ["id", "name"],
            },
        ],
    });
};

module.exports = {
    createNewProduct,
    getDetailProduct,
    findAllProduct,
    getProductSku,
    findAllSKUProduct,
};
