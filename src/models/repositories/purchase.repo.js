"use strict";

const { PURCHASE_STATUS } = require("../../common/common.constants");
const db = require("../../dbs/init.sqlserver");

const createNewPurchase = async ({
    providerId,
    totalAmount,
    expectedArrivalDate,
    details,
}) => {
    const t = await db.sequelize.transaction();

    try {
        // create new purchase
        const purchase = await db.Purchase.create(
            {
                fk_provider_id: providerId,
                expected_arrival_date: new Date(expectedArrivalDate),
                status: PURCHASE_STATUS.CREATED,
                total_amount: totalAmount,
            },
            { transaction: t }
        );

        // add purchase details
        for (const detail of details) {
            await db.DetailPurchase.create(
                {
                    fk_purchase_id: purchase.id,
                    fk_sku_no: detail.skuNo,
                    quantity: detail.quantity,
                    unit_price: detail.unitPrice,
                },
                { transaction: t }
            );
        }

        await t.commit();

        return await getDetailPurchase(purchase.id);
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getDetailPurchase = async (purchaseId, transaction) => {
    return await db.Purchase.findByPk(purchaseId, {
        include: [
            {
                model: db.SKU,
                include: { model: db.Unit, as: "unit" },
                include: { model: db.Product, as: "product" },
            },
            {
                model: db.Provider,
                as: "provider",
                attributes: ["id", "name", "contact_info", "is_active"],
            },
        ],
        attributes: ["id", "expected_arrival_date", "status", "total_amount"],
        transaction: transaction || null,
    });
};

module.exports = {
    createNewPurchase,
    getDetailPurchase,
};
