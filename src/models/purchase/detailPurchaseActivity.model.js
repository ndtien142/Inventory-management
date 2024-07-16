"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        status: { type: DataTypes.TINYINT, allowNull: false },
    };

    const options = {
        tableName: "detail_purchase_activity",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const DetailPurchaseActivity = sequelize.define(
        "DetailPurchaseActivity",
        attributes,
        options
    );

    return DetailPurchaseActivity;
}
