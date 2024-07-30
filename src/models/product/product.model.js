const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_id: { type: DataTypes.STRING(100), primaryKey: true },
        product_name: { type: DataTypes.STRING(100), allowNull: false },
        product_desc: { type: DataTypes.TEXT, allowNull: false },
        product_status: { type: DataTypes.TINYINT, allowNull: true },
        product_attrs: { type: DataTypes.TEXT, allowNull: true },
        thumbnail: { type: DataTypes.STRING(255), allowNull: false },
        sort: {
            type: DataTypes.INTEGER,
            // defaultValue: 0,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            // defaultValue: true,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            // defaultValue: false,
            allowNull: false,
        },
        product_category_id: { type: DataTypes.INTEGER, allowNull: false },
        product_brand_id: { type: DataTypes.INTEGER, allowNull: false },
    };

    const options = {
        tableName: "sd_product",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const Product = sequelize.define("Product", attributes, options);

    return Product;
}
