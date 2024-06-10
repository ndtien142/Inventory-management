const dbService = require("../services/database.service");

class ProductRepository {
    static async getAllProducts() {
        const query = `SELECT * FROM Product;`;
        return await dbService.executeQuery(query);
    }

    static async getProductById(productId) {
        const query = `
            SELECT * FROM Product
            WHERE ProductId = @productId;
        `;
        const params = [
            { name: "productId", type: dbService.TYPES.Int, value: productId },
        ];
        const result = await dbService.executeQuery(query, params);
        return result[0];
    }

    static async addProduct(product) {
        const query = `
            INSERT INTO Product (
                ProductCode, Barcode, ProductName, ProductDescription,
                ProductCategory, ReorderQuantity, PackedWeight, 
                ParkedHeight, ParkedWidth, ParkedDepth, Refrigerated
            )
            OUTPUT INSERTED.* 
            VALUES (
                @productCode, @barcode, @productName, @productDescription,
                @productCategory, @reorderQuantity, @packedWeight,
                @parkedHeight, @parkedWidth, @parkedDepth, @refrigerated
            );
            SELECT SCOPE_IDENTITY() AS ProductId;
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
            {
                name: "reorderQuantity",
                type: dbService.TYPES.Int,
                value: product.reorderQuantity,
            },
            {
                name: "packedWeight",
                type: dbService.TYPES.Decimal,
                value: product.packedWeight,
            },
            {
                name: "parkedHeight",
                type: dbService.TYPES.Decimal,
                value: product.parkedHeight,
            },
            {
                name: "parkedWidth",
                type: dbService.TYPES.Decimal,
                value: product.parkedWidth,
            },
            {
                name: "parkedDepth",
                type: dbService.TYPES.Decimal,
                value: product.parkedDepth,
            },
            {
                name: "refrigerated",
                type: dbService.TYPES.Bit,
                value: product.refrigerated,
            },
        ];
        const result = await dbService.executeQuery(query, params);
        return result[0];
    }

    static async updateProduct(productId, product) {
        const query = `
            UPDATE Product
            SET ProductCode = @productCode,
                Barcode = @barcode,
                ProductName = @productName,
                ProductDescription = @productDescription,
                ProductCategory = @productCategory,
                ReorderQuantity = @reorderQuantity,
                PackedWeight = @packedWeight,
                ParkedHeight = @parkedHeight,
                ParkedWidth = @parkedWidth,
                ParkedDepth = @parkedDepth,
                Refrigerated = @refrigerated
            OUTPUT INSERTED.*
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
            {
                name: "reorderQuantity",
                type: dbService.TYPES.Int,
                value: product.reorderQuantity,
            },
            {
                name: "packedWeight",
                type: dbService.TYPES.Decimal,
                value: product.packedWeight,
            },
            {
                name: "parkedHeight",
                type: dbService.TYPES.Decimal,
                value: product.parkedHeight,
            },
            {
                name: "parkedWidth",
                type: dbService.TYPES.Decimal,
                value: product.parkedWidth,
            },
            {
                name: "parkedDepth",
                type: dbService.TYPES.Decimal,
                value: product.parkedDepth,
            },
            {
                name: "refrigerated",
                type: dbService.TYPES.Bit,
                value: product.refrigerated,
            },
        ];
        const result = await dbService.executeQuery(query, params);
        return result[0];
    }

    static async deleteProduct(productId) {
        const query = `
            DELETE FROM Product
            OUTPUT DELETED.*
            WHERE ProductId = @productId;
        `;
        const params = [
            { name: "productId", type: dbService.TYPES.Int, value: productId },
        ];
        await dbService.executeQuery(query, params);
        return { ProductId: productId };
    }
}

module.exports = ProductRepository;
