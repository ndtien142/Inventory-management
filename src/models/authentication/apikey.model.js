"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            // defaultValue: true,
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_block: { type: DataTypes.BOOLEAN, allowNull: false },
    };

    const options = {
        tableName: "tb_api_key",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const ApiKeys = sequelize.define("ApiKeys", attributes, options);

    return ApiKeys;
}
