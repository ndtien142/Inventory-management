"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_user_code: { type: DataTypes.STRING(20), allowNull: false },
        total: { type: DataTypes.DECIMAL(18, 0), allowNull: true },
    };

    const options = {
        tableName: "tb_cart",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const Cart = sequelize.define("Cart", attributes, options);

    Cart.associate = function (models) {
        Cart.belongsTo(models.Account, {
            foreignKey: "fk_user_code",
            as: "user",
        });
    };

    return Cart;
}
