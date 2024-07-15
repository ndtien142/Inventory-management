"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_order_id: { type: DataTypes.BIGINT, allowNull: false },
        fk_sku_no: { type: DataTypes.STRING(100), allowNull: false },
        quantity: { type: DataTypes.BIGINT, allowNull: false },
        price_per_unit: { type: DataTypes.DECIMAL(18, 2), allowNull: false },
        unit_name: { type: DataTypes.STRING(255), allowNull: true },
        sub_total: { type: DataTypes.DECIMAL(18, 2), allowNull: false },
    };

    const options = {
        tableName: "order_line_item",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const OrderLineItem = sequelize.define(
        "OrderLineItem",
        attributes,
        options
    );

    OrderLineItem.associate = function (models) {
        OrderLineItem.belongsTo(models.Order, {
            foreignKey: "fk_order_id",
            as: "order",
        });
        OrderLineItem.belongsTo(models.SKU, {
            foreignKey: "fk_sku_no",
            as: "sku",
        });
    };

    return OrderLineItem;
}
