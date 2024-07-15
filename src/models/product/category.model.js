const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        description: { type: DataTypes.TEXT, allowNull: false },
        parent_category_id: { type: DataTypes.BIGINT, allowNull: true },
    };

    const options = {
        tableName: "tb_category",
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    };

    const Category = sequelize.define("Category", attributes, options);

    Category.associate = function (models) {
        Category.belongsTo(models.Category, {
            foreignKey: "parent_category_id",
            as: "parentCategory",
        });
    };

    return Category;
}
