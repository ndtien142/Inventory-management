const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        sku_no: { type: DataTypes.STRING(100), primaryKey: true },
        fk_product_id: { type: DataTypes.STRING(100), primaryKey: true },
        sku_name: { type: DataTypes.STRING(500), allowNull: false },
        sku_description: { type: DataTypes.TEXT, allowNull: false },
        sku_image: { type: DataTypes.STRING(255), allowNull: false },
        is_default: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: true,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        fk_unit_id: { type: DataTypes.BIGINT, allowNull: false },
        price: { type: DataTypes.DECIMAL(38, 0), allowNull: false },
        stock: { type: DataTypes.BIGINT, allowNull: false },
    };

    const options = {
        tableName: "sku",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const SKU = sequelize.define("SKU", attributes, options);

    SKU.associate = function (models) {
        SKU.belongsTo(models.Product, {
            foreignKey: "fk_product_id",
            as: "product",
        });
        SKU.belongsTo(models.Unit, {
            foreignKey: "fk_unit_id",
            as: "unit",
        });
    };

    return SKU;
}
