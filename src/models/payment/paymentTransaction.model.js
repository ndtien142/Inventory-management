"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_order_id: { type: DataTypes.BIGINT, allowNull: false },
        fk_payment_method_id: { type: DataTypes.BIGINT, allowNull: false },
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        amount: { type: DataTypes.DECIMAL(18, 2), allowNull: false },
        transaction_status: { type: DataTypes.STRING(50), allowNull: true },
        transaction_details: { type: DataTypes.STRING(255), allowNull: true },
    };

    const options = {
        tableName: "payment_transactions",
        timestamps: false,
    };

    const PaymentTransactions = sequelize.define(
        "PaymentTransactions",
        attributes,
        options
    );

    return PaymentTransactions;
}
