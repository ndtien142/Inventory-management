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
            type: DataTypes.STRING(255),
            allowNull: false,
            // unique: true
        },
    };

    const options = {
        tableName: "tb_unit",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    return sequelize.define("Unit", attributes, options);
}
