"use strict";

class Product {
    constructor(
        productId,
        productCode,
        barcode,
        productName,
        productDescription,
        productCategory,
        reorderQuantity,
        packedWeight,
        packedHeight,
        packedWidth,
        refrigerated
    ) {
        this.productId = productId;
        this.productCode = productCode;
        this.barcode = barcode;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productCategory = productCategory;
        this.reorderQuantity = reorderQuantity;
        this.packedWeight = packedWeight;
        this.packedHeight = packedHeight;
        this.packedWidth = packedWidth;
        this.refrigerated = refrigerated;
    }
}

module.exports = Product;
