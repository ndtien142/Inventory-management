"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_user_code: { type: DataTypes.STRING(20), allowNull: false },
        fk_address_id: { type: DataTypes.BIGINT, allowNull: false },
        fk_payment_id: { type: DataTypes.BIGINT, allowNull: false },
        order_date: { type: DataTypes.DATE, allowNull: false },
        total: { type: DataTypes.DECIMAL(18, 0), allowNull: false },
        order_status: { type: DataTypes.TINYINT, allowNull: false },
        fk_payment_method_id: { type: DataTypes.BIGINT, allowNull: true },
    };

    const options = {
        tableName: "tb_order",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const Order = sequelize.define("Order", attributes, options);

    Order.associate = function (models) {
        Order.belongsTo(models.CustomerAddress, {
            foreignKey: "fk_address_id",
            as: "address",
        });
        Order.belongsTo(models.PaymentMethod, {
            foreignKey: "fk_payment_method_id",
            as: "paymentMethod",
        });
        Order.belongsTo(models.Account, {
            foreignKey: "fk_user_code",
            as: "user",
        });
    };

    return Order;
}
