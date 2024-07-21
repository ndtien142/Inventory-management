const db = require("../../dbs/init.sqlserver");

const createNewCategory = async ({ name, description, parentCategory }) => {
    return await db.Category.create({
        name,
        description,
        parent_category_id: parentCategory?.id || null,
        create_time: new Date(),
        update_time: new Date(),
    });
};
const getCategoryById = async (id, option) => {
    return await db.Category.findByPk(parseInt(id), option);
};
const getAllCategory = async () => {
    return await db.Category.findAll();
};
const updateCategory = async (id, { name, description, parentCategory }) => {
    const category = getCategoryById(id);
    return await db.Category.update(
        {
            name: name || category.name,
            description: description || category.description,
            parent_category_id: parentCategory || category.parent_category_id,
            update_time: new Date(),
        },
        { where: { id: id } }
    );
};
const deleteCategory = async (id) => {
    return await db.Category.destroy({ where: { id: id } });
};
const getCategoryByName = async (categoryName) => {
    return db.Category.findOne({ where: { name: categoryName } });
};

module.exports = {
    createNewCategory,
    getCategoryById,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName,
};
