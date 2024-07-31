"use strict";

const db = require("../../dbs/init.sqlserver");
const { createNewPurchaseSchema } = require("./purchase.schema");
const { BadRequestError, NotFoundError } = require("../../core/error.response");
const {
    getProviderByNameAndId,
} = require("../../models/repositories/provider.repo");
const {
    createNewPurchase,
    getDetailPurchase,
    getAllPurchase,
} = require("../../models/repositories/purchase.repo");
const { getProductSku } = require("../../models/repositories/product.repo");
const { getKeyByValue } = require("../../utils");
const { PURCHASE_STATUS } = require("../../common/common.constants");

class PurchaseService {
    static async createPurchase({
        provider,
        expectedArrivalDate,
        details,
        totalAmount,
    }) {
        const { error, value } = createNewPurchaseSchema().validate({
            provider,
            expectedArrivalDate,
            details,
        });
        if (error) {
            throw new BadRequestError(
                `Validation error: ${error.details.map((x) => x.message).join(", ")}`
            );
        }

        const foundProvider = await getProviderByNameAndId({
            id: provider.id,
            name: provider.name,
        });

        if (!foundProvider) {
            throw new BadRequestError("Provider not found");
        }

        let calcAmount = 0;
        for (const detail of details) {
            calcAmount += detail.quantity * detail.unitPrice;
            const sku = await getProductSku(detail.skuNo);
            if (!sku || sku.is_deleted) {
                throw new BadRequestError(`SKU No '${detail.skuNo}' not found`);
            }
        }

        if (totalAmount !== calcAmount)
            throw new BadRequestError("Total amount not correct");

        const result = await createNewPurchase({
            providerId: foundProvider.id,
            expectedArrivalDate,
            totalAmount,
            details,
        });

        return {
            id: result.id,
            expectedArrivalDate: result.expected_arrival_date,
            status: getKeyByValue(PURCHASE_STATUS, result.status),
            totalAmount: result.total_amount,
            provider: {
                id: result.provider.id,
                name: result.provider.name,
                contactInfo: result.provider.contact_info,
                status: result.provider.status,
            },
            details: result.SKUs.map((sku) => {
                return {
                    skuNo: sku.sku_no,
                    product: {
                        id: sku.product.product_id,
                        name: sku.product.product_name,
                        description: sku.product.product_desc,
                        thumbnail: sku.product.thumbnail,
                        status: sku.product.status,
                    },
                    skuName: sku.sku_name,
                    skuDescription: sku.sku_description,
                    skuImage: sku.sku_image,
                    skuPrice: sku.price,
                    purchase: {
                        id: sku.DetailPurchase.fk_purchase_id,
                        unitPrice: sku.DetailPurchase.unit_price,
                        quantity: sku.DetailPurchase.quantity,
                        subTotal:
                            parseInt(sku.DetailPurchase.quantity) *
                            sku.DetailPurchase.unit_price,
                    },
                };
            }),
        };
    }

    static async getPurchaseById(purchaseId) {
        const foundPurchase = await getDetailPurchase(purchaseId);

        if (!foundPurchase) {
            throw new NotFoundError("Purchase not found");
        }
        return {
            id: foundPurchase.id,
            expectedArrivalDate: foundPurchase.expected_arrival_date,
            status: getKeyByValue(PURCHASE_STATUS, foundPurchase.status),
            totalAmount: foundPurchase.total_amount,
            provider: {
                id: foundPurchase.provider.id,
                name: foundPurchase.provider.name,
                contactInfo: foundPurchase.provider.contact_info,
                status: foundPurchase.provider.status,
            },
            details: foundPurchase.SKUs.map((sku) => {
                return {
                    skuNo: sku.sku_no,
                    product: {
                        id: sku.product.product_id,
                        name: sku.product.product_name,
                        description: sku.product.product_desc,
                        thumbnail: sku.product.thumbnail,
                        status: sku.product.status,
                    },
                    skuName: sku.sku_name,
                    skuDescription: sku.sku_description,
                    skuImage: sku.sku_image,
                    skuPrice: sku.price,
                    purchase: {
                        id: sku.DetailPurchase.fk_purchase_id,
                        unitPrice: sku.DetailPurchase.unit_price,
                        quantity: sku.DetailPurchase.quantity,
                        subTotal:
                            parseInt(sku.DetailPurchase.quantity) *
                            sku.DetailPurchase.unit_price,
                    },
                };
            }),
        };
    }

    static async updatePurchaseStatus(purchaseId, newStatus, user) {
        if (!Object.keys(PURCHASE_STATUS).includes(newStatus)) {
            throw new BadRequestError("Invalid status key");
        }

        const t = await db.sequelize.transaction();

        try {
            const purchase = await getDetailPurchase(purchaseId, t);

            if (!purchase) {
                throw new NotFoundError("Purchase not found");
            }

            if (
                purchase.status === PURCHASE_STATUS.DELIVERED ||
                purchase.status === PURCHASE_STATUS.CANCELLED
            ) {
                throw new BadRequestError("Cannot update purchase");
            }

            if (newStatus === getKeyByValue(PURCHASE_STATUS, 3)) {
                for (const detail of purchase.SKUs) {
                    const sku = await db.SKU.findByPk(detail.sku_no, {
                        transaction: t,
                    });
                    sku.stock =
                        parseInt(sku.stock) +
                        parseInt(detail.DetailPurchase.quantity);
                    await sku.save({ transaction: t });
                }
            }

            purchase.status = PURCHASE_STATUS[newStatus];

            await purchase.save({ transaction: t });

            await db.DetailPurchaseActivity.create(
                {
                    fk_admin_id: user.userCode,
                    fk_purchase_id: purchase.id,
                    status: PURCHASE_STATUS[newStatus],
                },
                { transaction: t }
            );

            await t.commit();
            return {
                id: purchase.id,
                expectedArrivalDate: purchase.expected_arrival_date,
                status: getKeyByValue(PURCHASE_STATUS, purchase.status),
                totalAmount: purchase.total_amount,
                provider: {
                    id: purchase.provider.id,
                    name: purchase.provider.name,
                    contactInfo: purchase.provider.contact_info,
                    status: purchase.provider.status,
                },
                details: purchase.SKUs.map((sku) => {
                    return {
                        skuNo: sku.sku_no,
                        product: {
                            id: sku.product.product_id,
                            name: sku.product.product_name,
                            description: sku.product.product_desc,
                            thumbnail: sku.product.thumbnail,
                            status: sku.product.status,
                        },
                        skuName: sku.sku_name,
                        skuDescription: sku.sku_description,
                        skuImage: sku.sku_image,
                        skuPrice: sku.price,
                        purchase: {
                            id: sku.DetailPurchase.fk_purchase_id,
                            unitPrice: sku.DetailPurchase.unit_price,
                            quantity: sku.DetailPurchase.quantity,
                            subTotal:
                                parseInt(sku.DetailPurchase.quantity) *
                                sku.DetailPurchase.unit_price,
                        },
                    };
                }),
            };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    static async getAllPurchase({ page = 1, limit = 20 }) {
        const offset = (parseInt(page) - 1) * limit;
        const { rows: purchases, count } = await getAllPurchase({
            offset,
            limit,
        });

        return {
            items: purchases.map((purchase) => {
                return {
                    id: purchase.id,
                    expectedArrivalDate: purchase.expected_arrival_date,
                    status: getKeyByValue(PURCHASE_STATUS, purchase.status),
                    totalAmount: purchase.total_amount,
                    provider: {
                        id: purchase.provider.id,
                        name: purchase.provider.name,
                        contactInfo: purchase.provider.contact_info,
                        status: purchase.provider.status,
                    },
                };
            }),
            meta: {
                currentPage: page,
                itemsPerPage: parseInt(limit),
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    }
}

module.exports = PurchaseService;
