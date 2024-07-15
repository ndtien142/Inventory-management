"use strict";

const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fk_user_code: { type: DataTypes.STRING(20), allowNull: false },
        first_name: { type: DataTypes.STRING(255), allowNull: false },
        last_name: { type: DataTypes.STRING(255), allowNull: false },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        address: { type: DataTypes.TEXT, allowNull: false },
    };

    const options = {
        tableName: "tb_profile",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Profile = sequelize.define("Profile", attributes, options);

    Profile.associate = function (models) {
        Profile.belongsTo(models.Account, {
            foreignKey: "fk_user_code",
            as: "user",
        });
    };

    return Profile;
}
