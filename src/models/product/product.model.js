"use strict";

const Category = require("./category.model");

class Product {
    constructor({
        productId,
        productName,
        productDesc,
        productStatus,
        productAttrs,
        productThumbnail,
        sort,
        isActive,
        isDeleted,
        productCategory,
        productBrand,
        createTime,
        updateTime,
    }) {
        this.productId = productId;
        this.productName = productName;
        this.productDesc = productDesc;
        this.productStatus = productStatus;
        this.productAttrs = productAttrs;
        this.productThumbnail = productThumbnail;
        this.sort = sort;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.productCategory =
            productCategory instanceof Category ? productCategory : null;
        this.productBrand = productBrand instanceof Brand ? productBrand : null;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Product;
