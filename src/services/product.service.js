"use strict";

const Joi = require("joi");
const ProductRepository = require("../repositories/product.repo");
const Product = require("../models/product.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class ProductService {
    static async getAllProducts() {
        const products = await ProductRepository.getAllProducts();
        if (products.length === 0) {
            throw new NotFoundError("No products found");
        }
        return products.map(
            (product) =>
                new Product(
                    product.ProductId,
                    product.ProductCode,
                    product.Barcode,
                    product.ProductName,
                    product.ProductDescription,
                    product.ProductCategory,
                    product.ReorderQuantity,
                    product.PackedWeight,
                    product.ParkedHeight,
                    product.ParkedWidth,
                    product.ParkedDepth,
                    product.Refrigerated
                )
        );
    }

    static async getProductById(productId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(productId);
        if (error) {
            throw new BadRequestError(`Invalid productId: ${error.message}`);
        }

        const product = await ProductRepository.getProductById(productId);
        if (!product) {
            throw new NotFoundError(`Product with ID ${productId} not found`);
        }
        return new Product(
            product.ProductId,
            product.ProductCode,
            product.Barcode,
            product.ProductName,
            product.ProductDescription,
            product.ProductCategory,
            product.ReorderQuantity,
            product.PackedWeight,
            product.ParkedHeight,
            product.ParkedWidth,
            product.ParkedDepth,
            product.Refrigerated
        );
    }

    static async createProduct(productData) {
        const schema = Joi.object({
            productCode: Joi.string().required(),
            barcode: Joi.string().required(),
            productName: Joi.string().required(),
            productDescription: Joi.string().required(),
            productCategory: Joi.string().required(),
            reorderQuantity: Joi.number().integer().min(0).required(),
            packedWeight: Joi.number().precision(2).required(),
            parkedHeight: Joi.number().precision(2).required(),
            parkedWidth: Joi.number().precision(2).required(),
            parkedDepth: Joi.number().precision(2).required(),
            refrigerated: Joi.boolean().required(),
        });

        const { error } = schema.validate(productData);
        if (error) {
            throw new BadRequestError(`Invalid product data: ${error.message}`);
        }

        const newProduct = await ProductRepository.addProduct(productData);
        return new Product(
            newProduct.ProductId,
            newProduct.ProductCode,
            newProduct.Barcode,
            newProduct.ProductName,
            newProduct.ProductDescription,
            newProduct.ProductCategory,
            newProduct.ReorderQuantity,
            newProduct.PackedWeight,
            newProduct.ParkedHeight,
            newProduct.ParkedWidth,
            newProduct.ParkedDepth,
            newProduct.Refrigerated
        );
    }

    static async updateProduct(productId, productData) {
        const productIdSchema = Joi.number().integer().min(1).required();
        const schema = Joi.object({
            productCode: Joi.string(),
            barcode: Joi.string(),
            productName: Joi.string(),
            productDescription: Joi.string(),
            productCategory: Joi.string(),
            reorderQuantity: Joi.number().integer().min(0),
            packedWeight: Joi.number().precision(2),
            parkedHeight: Joi.number().precision(2),
            parkedWidth: Joi.number().precision(2),
            parkedDepth: Joi.number().precision(2),
            refrigerated: Joi.boolean(),
        }).min(1);

        const { error: productIdError } = productIdSchema.validate(productId);
        if (productIdError) {
            throw new BadRequestError(
                `Invalid productId: ${productIdError.message}`
            );
        }

        const { error: productDataError } = schema.validate(productData);
        if (productDataError) {
            throw new BadRequestError(
                `Invalid product data: ${productDataError.message}`
            );
        }

        const updatedProduct = await ProductRepository.updateProduct(
            productId,
            productData
        );
        if (!updatedProduct) {
            throw new NotFoundError(`Product with ID ${productId} not found`);
        }
        return new Product(
            updatedProduct.ProductId,
            updatedProduct.ProductCode,
            updatedProduct.Barcode,
            updatedProduct.ProductName,
            updatedProduct.ProductDescription,
            updatedProduct.ProductCategory,
            updatedProduct.ReorderQuantity,
            updatedProduct.PackedWeight,
            updatedProduct.ParkedHeight,
            updatedProduct.ParkedWidth,
            updatedProduct.ParkedDepth,
            updatedProduct.Refrigerated
        );
    }

    static async deleteProduct(productId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(productId);
        if (error) {
            throw new BadRequestError(`Invalid productId: ${error.message}`);
        }

        const deletedProduct = await ProductRepository.deleteProduct(productId);
        if (!deletedProduct) {
            throw new NotFoundError(`Product with ID ${productId} not found`);
        }
        return new Product(
            deletedProduct.ProductId,
            deletedProduct.ProductCode,
            deletedProduct.Barcode,
            deletedProduct.ProductName,
            deletedProduct.ProductDescription,
            deletedProduct.ProductCategory,
            deletedProduct.ReorderQuantity,
            deletedProduct.PackedWeight,
            deletedProduct.ParkedHeight,
            deletedProduct.ParkedWidth,
            deletedProduct.ParkedDepth,
            deletedProduct.Refrigerated
        );
    }
}

module.exports = ProductService;
