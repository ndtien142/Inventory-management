"use strict";

const brandService = require("../services/product/brand.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class BrandController {
    getAllBrand = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all brand successfully",
            metadata: await brandService.getAllBrand({
                page: req.query.page,
                limit: req.query.limit,
            }),
        }).send(res);
    };
    getBrandById = async (req, res, next) => {
        new SuccessResponse({
            message: "Get brand by id successfully",
            metadata: await brandService.getBrandById(req.params.id),
        }).send(res);
    };
    createNewBrand = async (req, res, next) => {
        new CREATED({
            message: "Create new brand successfully",
            metadata: await brandService.createBrand(req.body),
        }).send(res);
    };
    deleteBrand = async (req, res, next) => {
        new SuccessResponse({
            message: "Delete brand successfully",
            metadata: await brandService.deleteBrand(req.params.id),
        }).send(res);
    };
    updateBrand = async (req, res, next) => {
        new SuccessResponse({
            message: "Update brand successfully",
            metadata: await brandService.updateBrand(req.params.id, req.body),
        }).send(res);
    };
}

module.exports = new BrandController();
