const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");

class ProductController {
    createProduct = async (req, res, next) => {
        const product = await ProductService.createProduct(req.body);
        new SuccessResponse({
            message: "Product created successfully!",
            status: 201,
            metadata: product,
        }).send(res);
    };

    getAllProducts = async (req, res, next) => {
        const products = await ProductService.getAllProducts();
        new SuccessResponse({
            message: "Get all products success!",
            status: 200,
            metadata: products,
        }).send(res);
    };

    getProductById = async (req, res, next) => {
        const product = await ProductService.getProductById(
            req.params.productId
        );
        new SuccessResponse({
            message: "Get product by ID success!",
            status: 200,
            metadata: product,
        }).send(res);
    };

    updateProduct = async (req, res, next) => {
        const product = await ProductService.updateProduct(
            req.params.productId,
            req.body
        );
        new SuccessResponse({
            message: "Product updated successfully!",
            status: 200,
            metadata: product,
        }).send(res);
    };

    deleteProduct = async (req, res, next) => {
        const product = await ProductService.deleteProduct(
            req.params.productId
        );
        new SuccessResponse({
            message: "Product deleted successfully!",
            status: 200,
            metadata: product,
        }).send(res);
    };
}

module.exports = new ProductController();
