const {
    getCategoryById,
    getAllCategory,
    getTreeCategory,
    createNewCategory,
    updateCategory,
} = require("../../models/repositories/category.repo");
const { createCategorySchema } = require("./category.schema");
const { BadRequestError, NotFoundError } = require("../../core/error.response");

class CategoryService {
    static getCategoryById = async (categoryId) => {
        const category = await getCategoryById(categoryId);
        if (!category) {
            throw new HostNotFoundError("Category not found");
        }
        return category;
    };
    static getCategory = async ({ page = 1, limit = 20 }) => {
        const offset = (parseInt(page) - 1) * limit;
        const { rows: categories, count } = await getAllCategory({
            offset,
            limit,
        });
        return {
            items: categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    isActive: category.is_active === 1,
                    parentCategoryId: category.parent_category_id || null,
                    parentCategory: category.parentCategory && {
                        id: category.parentCategory.id,
                        name: category.parentCategory.name,
                        description: category.parentCategory.description,
                        isActive: category.parentCategory.is_active === 1,
                        parentCategory: category.parentCategory
                            .parentCategory && {
                            id: category.parentCategory.parentCategory.id,
                            name: category.parentCategory.parentCategory.name,
                            description:
                                category.parentCategory.parentCategory
                                    .description,
                            isActive:
                                category.parentCategory.parentCategory
                                    .is_active === 1,
                        },
                    },
                };
            }),
            meta: {
                itemCount: categories.length,
                itemsPerPage: parseInt(limit),
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    };

    static getTreeCategory = async ({ page = 1, limit = 20 }) => {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { rows: categories, count } = await getTreeCategory({
            offset,
            limit,
        });
        return {
            items: categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    isActive: category.isActive,
                    parentCategoryId: category.parent_category_id || null,
                    children:
                        category.children &&
                        category.children.map((child) => ({
                            id: child.id,
                            name: child.name,
                            description: child.description,
                            isActive: child.isActive,
                            parentCategoryId: child.parent_category_id || null,
                            children:
                                child.children &&
                                child.children.map((grandchild) => ({
                                    id: grandchild.id,
                                    name: grandchild.name,
                                    description: grandchild.description,
                                    parentCategoryId:
                                        grandchild.parent_category_id || null,
                                    isActive: grandchild.isActive,
                                })),
                        })),
                };
            }),
            meta: {
                itemCount: categories.length,
                itemsPerPage: parseInt(limit),
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    };
    static createCategory = async ({
        name,
        description,
        parentCategoryId,
        isActive,
    }) => {
        const { error, value } = createCategorySchema({
            name,
            description,
            parentCategoryId,
            isActive,
        });

        if (error) {
            throw new BadRequestError(
                `Validation error: ${error.details.map((x) => x.message).join(", ")}`
            );
        }

        if (parentCategoryId) {
            const parentCategoryFound = await getCategoryById(parentCategoryId);
            if (!parentCategoryFound) {
                throw new NotFoundError("Parent category not found");
            }
        }

        const result = await createNewCategory({
            name,
            description,
            parentCategoryId: parentCategoryId,
            isActive: isActive,
        });

        return {
            id: result.id,
            name,
            description,
            isActive,
            parentCategoryId,
        };
    };

    static updateCategory = async (
        categoryId,
        { name, description, parentCategoryId, isActive }
    ) => {
        const foundCategory = await getCategoryById(categoryId);

        if (!foundCategory) {
            throw new NotFoundError("Category not found");
        }

        const result = await updateCategory(categoryId, {
            name,
            description,
            parentCategoryId,
            isActive,
        });
        return result;
    };
}

module.exports = CategoryService;
