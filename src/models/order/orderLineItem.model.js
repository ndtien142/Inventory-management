"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        quantity: { type: DataTypes.INTEGER, allowNull: false },
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

    return OrderLineItem;
}
