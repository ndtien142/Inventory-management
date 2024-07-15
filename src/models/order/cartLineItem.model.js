"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_sku_no: { type: DataTypes.STRING(100), allowNull: false },
        fk_cart_id: { type: DataTypes.BIGINT, allowNull: false },
        quantity: { type: DataTypes.BIGINT, allowNull: false },
    };

    const options = {
        tableName: "cart_line_item",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const CartLineItem = sequelize.define("CartLineItem", attributes, options);

    CartLineItem.associate = function (models) {
        CartLineItem.belongsTo(models.Cart, {
            foreignKey: "fk_cart_id",
            as: "cart",
        });
        CartLineItem.belongsTo(models.SKU, {
            foreignKey: "fk_sku_no",
            as: "sku",
        });
    };

    return CartLineItem;
}
