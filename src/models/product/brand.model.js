"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        brand_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            // unique: true,
        },
        brand_description: { type: DataTypes.TEXT, allowNull: true },
    };

    const options = {
        tableName: "tb_brand",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    return sequelize.define("Brand", attributes, options);
}
