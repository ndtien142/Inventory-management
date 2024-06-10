const dbService = require("../services/database.service");

function getAllProducts(callback) {
    const query = `
        SELECT * FROM Product;
    `;
    dbService.executeQuery(query, callback);
}

function getProductById(productId, callback) {
    const query = `
        SELECT * FROM Product
        WHERE ProductId = @productId;
    `;
    const params = [
        { name: "productId", type: dbService.TYPES.Int, value: productId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addProduct(product, callback) {
    const query = `
        INSERT INTO Product (ProductCode, Barcode, ProductName, ProductDescription, ProductCategory)
        VALUES (@productCode, @barcode, @productName, @productDescription, @productCategory);
    `;
    const params = [
        {
            name: "productCode",
            type: dbService.TYPES.VarChar,
            value: product.productCode,
        },
        {
            name: "barcode",
            type: dbService.TYPES.VarChar,
            value: product.barcode,
        },
        {
            name: "productName",
            type: dbService.TYPES.VarChar,
            value: product.productName,
        },
        {
            name: "productDescription",
            type: dbService.TYPES.VarChar,
            value: product.productDescription,
        },
        {
            name: "productCategory",
            type: dbService.TYPES.VarChar,
            value: product.productCategory,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateProduct(productId, product, callback) {
    const query = `
        UPDATE Product
        SET ProductCode = @productCode,
            Barcode = @barcode,
            ProductName = @productName,
            ProductDescription = @productDescription,
            ProductCategory = @productCategory
        WHERE ProductId = @productId;
    `;
    const params = [
        { name: "productId", type: dbService.TYPES.Int, value: productId },
        {
            name: "productCode",
            type: dbService.TYPES.VarChar,
            value: product.productCode,
        },
        {
            name: "barcode",
            type: dbService.TYPES.VarChar,
            value: product.barcode,
        },
        {
            name: "productName",
            type: dbService.TYPES.VarChar,
            value: product.productName,
        },
        {
            name: "productDescription",
            type: dbService.TYPES.VarChar,
            value: product.productDescription,
        },
        {
            name: "productCategory",
            type: dbService.TYPES.VarChar,
            value: product.productCategory,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteProduct(productId, callback) {
    const query = `
        DELETE FROM Product
        WHERE ProductId = @productId;
    `;
    const params = [
        { name: "productId", type: dbService.TYPES.Int, value: productId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
