"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.STRING(255), allowNull: true },
        is_active: {
            type: DataTypes.BOOLEAN,
            // defaultValue: true,
        },
    };

    const options = {
        tableName: "payment_methods",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    return sequelize.define("PaymentMethod", attributes, options);
}
