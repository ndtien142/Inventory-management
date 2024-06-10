const express = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productCode
 *         - barcode
 *         - productName
 *         - productDescription
 *         - productCategory
 *         - reorderQuantity
 *         - packedWeight
 *         - parkedHeight
 *         - parkedWidth
 *         - parkedDepth
 *         - refrigerated
 *       properties:
 *         productId:
 *           type: integer
 *           description: The auto-generated ID of the product
 *         productCode:
 *           type: string
 *           description: The code of the product
 *         barcode:
 *           type: string
 *           description: The barcode of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         productDescription:
 *           type: string
 *           description: A detailed description of the product
 *         productCategory:
 *           type: string
 *           description: The category of the product
 *         reorderQuantity:
 *           type: integer
 *           description: The quantity to reorder when stock is low
 *         packedWeight:
 *           type: number
 *           format: decimal
 *           description: The weight of the packed product
 *         parkedHeight:
 *           type: number
 *           format: decimal
 *           description: The height of the packed product
 *         parkedWidth:
 *           type: number
 *           format: decimal
 *           description: The width of the packed product
 *         parkedDepth:
 *           type: number
 *           format: decimal
 *           description: The depth of the packed product
 *         refrigerated:
 *           type: boolean
 *           description: Whether the product requires refrigeration
 *       example:
 *         productId: 1
 *         productCode: "PRD001"
 *         barcode: "1234567890123"
 *         productName: "Example Product"
 *         productDescription: "This is an example product"
 *         productCategory: "Category1"
 *         reorderQuantity: 50
 *         packedWeight: 10.5
 *         parkedHeight: 20.5
 *         parkedWidth: 15.0
 *         parkedDepth: 5.0
 *         refrigerated: false
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */
router.post("/", asyncHandler(productController.createProduct));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 */
router.get("/", asyncHandler(productController.getAllProducts));

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:productId", asyncHandler(productController.getProductById));

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.put("/:productId", asyncHandler(productController.updateProduct));

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: The product was successfully deleted
 *       404:
 *         description: Product not found
 */
router.delete("/:productId", asyncHandler(productController.deleteProduct));

module.exports = router;
