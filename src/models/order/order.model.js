"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        fk_user_code: { type: DataTypes.STRING(20), allowNull: false },
        fk_address_id: { type: DataTypes.INTEGER, allowNull: false },
        fk_payment_id: { type: DataTypes.INTEGER, allowNull: false },
        order_date: { type: DataTypes.DATE, allowNull: false },
        total: { type: DataTypes.DECIMAL(18, 0), allowNull: false },
        order_status: { type: DataTypes.TINYINT, allowNull: false },
        fk_payment_method_id: { type: DataTypes.INTEGER, allowNull: true },
    };

    const options = {
        tableName: "tb_order",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const Order = sequelize.define("Order", attributes, options);

    return Order;
}
