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
}

module.exports = PurchaseService;
