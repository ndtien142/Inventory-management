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
        name: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            // unique: true
        },
        contact_info: { type: DataTypes.TEXT, allowNull: false },
        is_active: {
            type: DataTypes.BOOLEAN,
            // defaultValue: true,
            allowNull: false,
        },
    };

    const options = {
        tableName: "tb_provider",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    return sequelize.define("Provider", attributes, options);
}
