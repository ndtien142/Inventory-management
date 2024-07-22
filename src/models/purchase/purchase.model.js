"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_provider_id: { type: DataTypes.BIGINT, allowNull: false },
        expected_arrival_date: { type: DataTypes.DATE, allowNull: false },
        total_amount: { type: DataTypes.DECIMAL(18, 0), allowNull: false },
        status: { type: DataTypes.TINYINT, allowNull: false },
    };

    const options = {
        tableName: "tb_purchase",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const Purchase = sequelize.define("Purchase", attributes, options);

    return Purchase;
}
