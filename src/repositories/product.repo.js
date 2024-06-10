const dbService = require("../services/database.service");

async function getAllProducts() {
    const query = `SELECT * FROM Product;`;
    return await dbService.executeQuery(query);
}

async function getProductById(productId) {
    const query = `
        SELECT * FROM Product
        WHERE ProductId = @productId;
    `;
    const params = [
        { name: "productId", type: dbService.TYPES.Int, value: productId },
    ];
    return await dbService.executeQuery(query, params);
}

async function addProduct(product) {
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
    return await dbService.executeQuery(query, params);
}

async function updateProduct(productId, product) {
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
    return await dbService.executeQuery(query, params);
}

async function deleteProduct(productId) {
    const query = `
        DELETE FROM Product
        WHERE ProductId = @productId;
    `;
    const params = [
        { name: "productId", type: dbService.TYPES.Int, value: productId },
    ];
    return await dbService.executeQuery(query, params);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
