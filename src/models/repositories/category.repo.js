const db = require("../../dbs/init.sqlserver");

const createNewCategory = async ({
    name,
    description,
    parentCategoryId,
    isActive,
}) => {
    return await db.Category.create({
        name,
        description,
        parent_category_id: parentCategoryId || null,
        is_active: isActive,
    });
};
const getCategoryById = async (id, option) => {
    return await db.Category.findByPk(parseInt(id), {
        include: [
            {
                model: db.Category,
                as: "parentCategory",
                include: [
                    {
                        model: db.Category,
                        as: "parentCategory",
                        include: [
                            {
                                model: db.Category,
                                as: "parentCategory",
                            },
                        ],
                    },
                ],
            },
        ],
        order: [["name", "ASC"]],
        ...option,
    });
};
const getAllCategory = async ({ offset = 0, limit = 20 }) => {
    return await db.Category.findAndCountAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        include: [
            {
                model: db.Category,
                as: "parentCategory",
                include: [
                    {
                        model: db.Category,
                        as: "parentCategory",
                        include: [
                            {
                                model: db.Category,
                                as: "parentCategory",
                            },
                        ],
                    },
                ],
            },
        ],
        order: [["name", "ASC"]],
        attributes: ["id", "name", "description", "parent_category_id"],
    });
};

const getTreeCategory = async ({ offset = 0, limit = 100 }) => {
    return await db.Category.findAndCountAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        where: {
            parent_category_id: null,
        },
        include: [
            {
                model: db.Category,
                as: "children",
                include: [
                    {
                        model: db.Category,
                        as: "children",
                        include: [
                            {
                                model: db.Category,
                                as: "children",
                            },
                        ],
                    },
                ],
            },
        ],
        order: [["name", "ASC"]],
        attributes: ["id", "name", "description", "parent_category_id"],
    });
};

const updateCategory = async (
    id,
    { name, description, parentCategoryId, isActive }
) => {
    const category = getCategoryById(id);
    return await db.Category.update(
        {
            name: name || category.name,
            description: description || category.description,
            parent_category_id: parentCategoryId || category.parent_category_id,
            is_active: isActive !== null ? isActive : category.is_active,
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
    getTreeCategory,
};
