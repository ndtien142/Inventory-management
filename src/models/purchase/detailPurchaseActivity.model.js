"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_purchase_id: { type: DataTypes.BIGINT, allowNull: false },
        fk_admin_id: { type: DataTypes.STRING(20), allowNull: false },
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

    DetailPurchaseActivity.associate = function (models) {
        DetailPurchaseActivity.belongsTo(models.Purchase, {
            foreignKey: "fk_purchase_id",
            as: "purchase",
        });
        DetailPurchaseActivity.belongsTo(models.Account, {
            foreignKey: "fk_admin_id",
            as: "admin",
        });
    };

    return DetailPurchaseActivity;
}
