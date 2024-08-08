"use strict";

const { ORDER_STATUS } = require("../../common/common.constants");
const { BadRequestError } = require("../../core/error.response");
const db = require("../../dbs/init.sqlserver");
const { Op, fn, col, literal, where } = require("sequelize");

class OrderService {
    static async validateOrder({
        addressId,
        paymentMethodId,
        orderDate,
        totalAmount,
        orderLineItems,
    }) {
        const address = await db.Address.findByPk(addressId);
        if (!address) {
            throw new BadRequestError(`Address ID not found: ${addressId}`);
        }

        const paymentMethod = await db.PaymentMethod.findByPk(paymentMethodId);
        if (!paymentMethod) {
            throw new BadRequestError(
                `Payment Method ID not found: ${paymentMethodId}`
            );
        }

        if (isNaN(totalAmount) || totalAmount <= 0) {
            throw new BadRequestError(`Invalid totalAmount: ${totalAmount}`);
        }

        let calculatedTotalAmount = 0;
        for (let item of orderLineItems) {
            const expectedSubTotal = item.pricePerUnit * item.quantity;
            if (item.subTotal !== expectedSubTotal) {
                throw new BadRequestError(
                    `SubTotal does not match calculated value for SKU: ${item.skuNo}`
                );
            }
            calculatedTotalAmount += item.subTotal;
        }

        for (let item of orderLineItems) {
            const product = await db.Product.findByPk(item.productId);
            if (!product) {
                throw new BadRequestError(
                    `Product ID not found: ${item.productId}`
                );
            }

            let sku = await db.SKU.findOne({ where: { skuNo: item.skuNo } });
            if (!sku || sku.fk_product_id !== item.productId) {
                throw new BadRequestError(
                    `SKU not found or does not match Product ID: ${item.skuNo}`
                );
            }

            if (item.pricePerUnit !== sku.price_per_unit) {
                throw new BadRequestError(
                    `PricePerUnit does not match SKU price for SKU: ${item.skuNo}`
                );
            }

            const unit = await db.Unit.findByPk(item.unit.id);
            if (!unit || unit.name !== item.unit.name) {
                throw new BadRequestError(
                    `Unit ID or Unit Name does not match for SKU: ${item.skuNo}`
                );
            }
        }
    }
    static async createOrder({
        userCode,
        addressId,
        paymentMethodId,
        orderDate,
        totalAmount,
        paymentAmount,
        orderLineItems,
    }) {
        const t = await db.sequelize.transaction();

        try {
            // Tạo đơn hàng
            const order = await db.Order.create(
                {
                    fk_user_code: userCode,
                    fk_address_id: addressId,
                    fk_payment_id: 0,
                    order_date: orderDate,
                    total: totalAmount,
                    order_status: ORDER_STATUS.PENDING,
                    fk_payment_method_id: paymentMethodId,
                },
                { transaction: t }
            );

            // Xử lý từng dòng đơn hàng song song
            const orderLinePromises = orderLineItems.map(async (item) => {
                let sku = await db.SKU.findOne({
                    where: { sku_no: item.skuNo },
                    transaction: t,
                });
                if (!sku) {
                    throw new BadRequestError(`SKU not found: ${item.skuNo}`);
                }

                let requiredQuantity = item.quantity;
                let availableQuantity = sku.stock;

                // Nếu số lượng tồn kho không đủ, xử lý chuyển đổi đơn vị
                if (availableQuantity < requiredQuantity) {
                    const conversions = await db.UnitConversion.findAll({
                        where: {
                            fk_product_id: item.productId,
                            conversion_unit_id: item.unit.id,
                        },
                        order: [["rate_conversion", "DESC"]],
                        transaction: t,
                    });

                    if (conversions.length === 0) {
                        throw new BadRequestError(
                            `Không đủ hàng và không có chuyển đổi cho SKU: ${item.skuNo}`
                        );
                    }

                    let totalConvertedStock = 0;
                    for (const conversion of conversions) {
                        if (
                            totalConvertedStock >=
                            requiredQuantity - availableQuantity
                        )
                            break;

                        const baseUnitSkus = await db.SKU.findAll({
                            where: {
                                fk_product_id: item.productId,
                                fk_unit_id: conversion.base_unit_id,
                                stock: {
                                    [Op.gt]: 0,
                                },
                            },
                            order: [["stock", "DESC"]],
                            transaction: t,
                        });

                        for (const baseUnitSku of baseUnitSkus) {
                            const availableBaseUnitStock = baseUnitSku.stock;
                            const conversionRequired = Math.min(
                                Math.ceil(
                                    (requiredQuantity -
                                        availableQuantity -
                                        totalConvertedStock) /
                                        conversion.rate_conversion
                                ),
                                availableBaseUnitStock
                            );

                            totalConvertedStock +=
                                conversionRequired * conversion.rate_conversion;

                            await baseUnitSku.update(
                                {
                                    stock:
                                        availableBaseUnitStock -
                                        conversionRequired,
                                },
                                { transaction: t }
                            );

                            if (
                                totalConvertedStock >=
                                requiredQuantity - availableQuantity
                            )
                                break;
                        }
                    }

                    if (
                        totalConvertedStock <
                        requiredQuantity - availableQuantity
                    ) {
                        throw new BadRequestError(
                            `Không đủ hàng để chuyển đổi cho SKU: ${item.skuNo}`
                        );
                    }

                    await sku.update(
                        { stock: availableQuantity + totalConvertedStock },
                        { transaction: t }
                    );
                }

                if (sku.stock < requiredQuantity) {
                    throw new BadRequestError(
                        `Insufficient stock for SKU: ${item.skuNo}`
                    );
                }

                await sku.update(
                    { stock: sku.stock - requiredQuantity },
                    { transaction: t }
                );

                await db.OrderLineItem.create(
                    {
                        price_per_unit: item.pricePerUnit,
                        unit_name: item.unit.name,
                        quantity: item.quantity,
                        sub_total: item.subTotal,
                        fk_sku_no: item.skuNo,
                        fk_order_id: order.id,
                    },
                    { transaction: t }
                );
            });

            await Promise.all(orderLinePromises);

            await db.PaymentTransactions.create(
                {
                    fk_order_id: order.id,
                    fk_payment_method_id: paymentMethodId,
                    transaction_date: orderDate,
                    amount: totalAmount,
                    transaction_status: "Pending",
                    transaction_details: "tao moi",
                },
                { transaction: t }
            );

            await t.commit();
            return order;
        } catch (error) {
            await t.rollback();
            console.error("Error creating order:", error);
            throw error;
        }
    }
    static async getOrderStatistics() {
        const allOrders = await db.Order.findAll({
            attributes: [
                [literal(`'Tất cả'`), "name"],
                [fn("COUNT", col("id")), "numberOfOrder"],
                [fn("SUM", col("total")), "totalAmount"],
                [literal("100"), "percentageOfTotal"],
            ],
            raw: true,
        });

        const statusOrders = await db.Order.findAll({
            attributes: [
                [
                    literal(`CASE
                        WHEN order_status = ${ORDER_STATUS.PENDING} THEN N'Xác nhận'
                        WHEN order_status = ${ORDER_STATUS.PROCESSING} THEN N'Xử lý'
                        WHEN order_status = ${ORDER_STATUS.SHIPPED} THEN N'Vận chuyển'
                        WHEN order_status = ${ORDER_STATUS.DELIVERED} THEN N'Giao thành công'
                        WHEN order_status = ${ORDER_STATUS.CANCELLED} THEN N'Hủy'
                    END`),
                    "name",
                ],
                [fn("COUNT", col("id")), "numberOfOrder"],
                [fn("SUM", col("total")), "totalAmount"],
            ],
            where: {
                order_status: {
                    [Op.in]: [
                        ORDER_STATUS.PENDING,
                        ORDER_STATUS.PROCESSING,
                        ORDER_STATUS.SHIPPED,
                        ORDER_STATUS.DELIVERED,
                        ORDER_STATUS.CANCELLED,
                    ],
                },
            },
            group: ["order_status"],
            raw: true,
        });

        const totalOrders = parseInt(allOrders[0].numberOfOrder, 10);
        statusOrders.forEach((item) => {
            item.percentageOfTotal =
                totalOrders > 0
                    ? (parseInt(item.numberOfOrder, 10) / totalOrders) * 100
                    : 0;
        });

        const statistics = [
            {
                name: "Tất cả",
                numberOfOrder: allOrders[0].numberOfOrder,
                totalAmount: parseFloat(allOrders[0].totalAmount) || 0,
                percentageOfTotal: 100,
            },
            ...statusOrders,
        ];

        return statistics;
    }
    static async getAllOrder({
        orderStatus = null,
        searchText = "",
        page = 1,
        limit = 20,
    }) {
        let searchParams = {};
        if (orderStatus) {
            searchParams.order_status = orderStatus;
        }
        if (searchText) {
            searchParams = {
                ...searchParams,
                [Op.or]: [
                    { customer_name: { [Op.like]: `%${searchText}%` } },
                    { order_no: { [Op.like]: `%${searchText}%` } },
                ],
            };
        }
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { rows: listOrder, count } = await db.Order.findAndCountAll({
            offset: offset,
            limit: parseInt(limit),
            where: searchParams,
            order: [["create_time", "DESC"]],
            include: [
                {
                    model: db.Account,
                    as: "user",
                },
                {
                    model: db.CustomerAddress,
                    as: "address",
                },
                {
                    model: db.PaymentMethod,
                    as: "paymentMethod",
                },
                {
                    model: db.SKU,
                    include: { model: db.Unit, as: "unit" },
                },
            ],
        });

        return {
            items: listOrder.map((order) => {
                return {
                    id: order.id,
                    totalAmount: order.total,
                    orderStatus: order.order_status,
                    createTime: order.create_time,
                    user: {
                        userCode: order.user.user_code,
                        username: order.user.username,
                        isActive: order.user.is_active,
                        isBlock: order.user.is_block,
                    },
                    address: {
                        id: order.address.id,
                        addressLine1: order.address.address_line1,
                        addressLine2: order.address.address_line2,
                        city: order.address.city,
                        stateProvince: order.address.state_province,
                        postalCode: order.address.postal_code,
                        phoneNumber: order.address.phone_number,
                    },
                    paymentMethod: {
                        id: order.paymentMethod.id,
                        name: order.paymentMethod.name,
                        description: order.paymentMethod.description,
                    },
                    orderLineItems: order.SKUs.map((lineItem) => {
                        return {
                            skuNo: lineItem.sku_no,
                            quantity: lineItem.OrderLineItem.quantity,
                            pricePerUnit: lineItem.OrderLineItem.price_per_unit,
                            subTotal: lineItem.OrderLineItem.sub_total,
                            unit: {
                                id: lineItem.unit.id,
                                name: lineItem.unit.name,
                            },
                        };
                    }),
                };
            }),
            meta: {
                currentPage: parseInt(page),
                itemsPerPage: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit)),
                totalItems: count,
            },
        };
    }
}

module.exports = OrderService;
