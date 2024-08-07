"use strict";

const ProductService = require("../services/product/product.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class CustomerProductController {
    getDetailProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get Product Detail Successfully",
            metadata: await ProductService.customerGetProductDetail(
                req.params.productId
            ),
        }).send(res);
    };
    getListProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get List Product Successfully",
            metadata: await ProductService.customerGetListProduct({
                limit: req.query.limit,
                page: req.query.page,
            }),
        }).send(res);
    };
}

module.exports = new CustomerProductController();
