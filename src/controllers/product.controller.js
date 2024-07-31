"use strict";

const ProductService = require("../services/product/product.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class ProductController {
    createNewProduct = async (req, res, next) => {
        new CREATED({
            message: "Create new Product Successful",
            metadata: await ProductService.createProduct({ ...req.body }),
        }).send(res);
    };
    getDetailProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get Product Detail Successfully",
            metadata: await ProductService.getProductDetails(
                req.params.productId
            ),
        }).send(res);
    };
    getListProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get List Product Successfully",
            metadata: await ProductService.getListProduct({
                limit: req.query.limit,
                page: req.query.page,
            }),
        }).send(res);
    };
    updateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Update Product Successfully",
            metadata: await ProductService.updateProduct(
                req.params.productId,
                req.body
            ),
        }).send(res);
    };
    updateStatusProduct = async function (req, res, next) {
        new SuccessResponse({
            message: "Update Product Status Successfully",
            metadata: await ProductService.editStatusProduct(
                req.params.productId
            ),
        }).send(res);
    };
    getSKUProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get List SKU Product Successfully",
            metadata: await ProductService.getListSKUProduct({
                limit: req.query.limit,
                page: req.query.page,
            }),
        }).send(res);
    };
}

module.exports = new ProductController();
