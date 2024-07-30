"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        fk_user_code: { type: DataTypes.STRING(20), allowNull: false },
        address_line1: { type: DataTypes.STRING(255), allowNull: false },
        address_line2: { type: DataTypes.STRING(255), allowNull: true },
        city: { type: DataTypes.STRING(100), allowNull: false },
        state_province: { type: DataTypes.STRING(100), allowNull: false },
        postal_code: { type: DataTypes.STRING(20), allowNull: false },
        country: { type: DataTypes.STRING(100), allowNull: false },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            // defaultValue: false,
            allowNull: true,
        },
    };

    const options = {
        tableName: "tb_customer_address",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const CustomerAddress = sequelize.define(
        "CustomerAddress",
        attributes,
        options
    );

    return CustomerAddress;
}
