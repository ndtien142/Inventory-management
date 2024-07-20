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
}

module.exports = new ProductController();
