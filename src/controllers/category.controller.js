"use strict";

const categoryService = require("../services/product/category.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class CategoryController {
    getCategoryById = async (req, res, next) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Get category by id successfully",
            metadata: await categoryService.getCategoryById(id),
        }).send(res);
    };
    getCategory = async (req, res, next) => {
        const { page = 1, limit = 20 } = req.query;
        new SuccessResponse({
            message: "Get all categories successfully",
            metadata: await categoryService.getCategory({ page, limit }),
        }).send(res);
    };
    getTreeCategory = async (req, res, next) => {
        const { page = 1, limit = 100 } = req.query;
        new SuccessResponse({
            message: "Get tree categories successfully",
            metadata: await categoryService.getTreeCategory({ page, limit }),
        }).send(res);
    };
    createNewCategory = async (req, res, next) => {
        new CREATED({
            message: "Create new category successfully",
            metadata: await categoryService.createCategory(req.body),
        }).send(res);
    };
    updateCategory = async (req, res, next) => {
        new SuccessResponse({
            message: "Update category successfully",
            metadata: await categoryService.updateCategory(
                req.params.id,
                req.body
            ),
        });
    };
}

module.exports = new CategoryController();
