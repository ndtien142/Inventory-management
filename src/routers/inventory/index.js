/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       properties:
 *         inventoryId:
 *           type: integer
 *         quantityAvailable:
 *           type: integer
 *         minimumStockLevel:
 *           type: integer
 *         maximumStockLevel:
 *           type: integer
 *         reorderPoint:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         warehouse:
 *           $ref: '#/components/schemas/Warehouse'
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *         productCode:
 *           type: string
 *         barcode:
 *           type: string
 *         productName:
 *           type: string
 *         productDescription:
 *           type: string
 *         productCategory:
 *           type: string
 *         reorderQuantity:
 *           type: integer
 *         packedWeight:
 *           type: number
 *         packedHeight:
 *           type: number
 *         packedWidth:
 *           type: number
 *         packedDepth:
 *           type: number
 *         refrigerated:
 *           type: boolean
 *     Warehouse:
 *       type: object
 *       properties:
 *         warehouseId:
 *           type: integer
 *         warehouseName:
 *           type: string
 *         isRefrigerated:
 *           type: boolean
 *         location:
 *           $ref: '#/components/schemas/Location'
 *     Location:
 *       type: object
 *       properties:
 *         locationId:
 *           type: integer
 *         locationName:
 *           type: string
 *         locationAddress:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API endpoints for managing inventory
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventory]
 *     description: Retrieve a list of all inventories.
 *     responses:
 *       200:
 *         description: A list of inventories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 */

/**
 * @swagger
 * /inventory/{inventoryId}:
 *   get:
 *     summary: Get inventory by Id
 *     tags: [Inventory]
 *     description: Retrieve an inventory by its Id.
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory details by Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory not found
 */

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create a new inventory
 *     tags: [Inventory]
 *     description: Create a new inventory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Inventory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Bad request (e.g., inventory already exists)
 */

/**
 * @swagger
 * /inventory/{inventoryId}:
 *   put:
 *     summary: Update inventory by Id
 *     tags: [Inventory]
 *     description: Update an existing inventory by its Id.
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory not found
 */

/**
 * @swagger
 * /inventory/{inventoryId}:
 *   delete:
 *     summary: Delete inventory by Id
 *     tags: [Inventory]
 *     description: Delete an existing inventory by its Id.
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 *       404:
 *         description: Inventory not found
 */

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const inventoryController = require("../../controllers/inventory.controller");
const router = express.Router();

router.get("", asyncHandler(inventoryController.getAllInventories));
router.get("/:inventoryId", asyncHandler(inventoryController.getInventoryById));
router.post("", asyncHandler(inventoryController.createInventory));
router.put("/:inventoryId", asyncHandler(inventoryController.updateInventory));
router.delete(
    "/:inventoryId",
    asyncHandler(inventoryController.deleteInventory)
);

module.exports = router;
