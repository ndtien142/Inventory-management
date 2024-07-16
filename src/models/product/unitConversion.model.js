const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, primaryKey: true },
        base_unit_id: { type: DataTypes.BIGINT, allowNull: false },
        conversion_unit_id: { type: DataTypes.BIGINT, allowNull: false },
        rate_conversion: { type: DataTypes.FLOAT, allowNull: false },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        fk_product_id: { type: DataTypes.STRING(100), allowNull: true },
    };

    const options = {
        tableName: "tb_unit_conversion",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const UnitConversion = sequelize.define(
        "UnitConversion",
        attributes,
        options
    );

    return UnitConversion;
}
