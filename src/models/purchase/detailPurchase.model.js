"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        unit_price: { type: DataTypes.DECIMAL(18, 2), allowNull: false },
    };

    const options = {
        tableName: "detail_purchase",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const DetailPurchase = sequelize.define(
        "DetailPurchase",
        attributes,
        options
    );

    return DetailPurchase;
}
