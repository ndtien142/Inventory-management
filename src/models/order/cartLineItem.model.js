"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        quantity: { type: DataTypes.BIGINT, allowNull: false },
    };

    const options = {
        tableName: "cart_line_item",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const CartLineItem = sequelize.define("CartLineItem", attributes, options);

    return CartLineItem;
}
