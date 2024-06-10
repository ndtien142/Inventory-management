"use strict";

const express = require("express");
const warehouseController = require("../../controllers/warehouse.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: API endpoints for managing warehouses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Warehouse:
 *       type: object
 *       properties:
 *         warehouseId:
 *           type: integer
 *           description: The ID of the warehouse.
 *         warehouseName:
 *           type: string
 *           description: The name of the warehouse.
 *         isRefrigerated:
 *           type: boolean
 *           description: Indicates if the warehouse is refrigerated or not.
 *         location:
 *           type: object
 *           properties:
 *             locationId:
 *               type: integer
 *               description: The ID of the location.
 *             locationName:
 *               type: string
 *               description: The name of the location.
 *             locationAddress:
 *               type: string
 *               description: The address of the location.
 *
 * /warehouses:
 *   get:
 *     summary: Get all warehouses
 *     tags:
 *       - Warehouses
 *     description: Retrieve a list of all warehouses.
 *     responses:
 *       '200':
 *         description: A list of warehouses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 *       '404':
 *         description: No warehouses found
 */

router.get("", asyncHandler(warehouseController.getAllWarehouses));

/**
 * @swagger
 * /warehouses/{warehouseId}:
 *   get:
 *     summary: Get warehouse by ID
 *     tags: [Warehouses]
 *     description: Retrieve a warehouse by its ID.
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Warehouse details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       404:
 *         description: Warehouse not found
 */

router.get("/:warehouseId", asyncHandler(warehouseController.getWarehouseById));

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         locationId:
 *           type: integer
 *           description: The ID of the location.
 *         locationName:
 *           type: string
 *           description: The name of the location.
 *         locationAddress:
 *           type: string
 *           description: The address of the location.
 *     Warehouse:
 *       type: object
 *       properties:
 *         warehouseId:
 *           type: integer
 *           description: The ID of the warehouse.
 *         warehouseName:
 *           type: string
 *           description: The name of the warehouse.
 *         isRefrigerated:
 *           type: boolean
 *           description: Indicates if the warehouse is refrigerated or not.
 *         location:
 *           $ref: '#/components/schemas/Location'
 *     NewWarehouse:
 *       type: object
 *       properties:
 *         warehouseName:
 *           type: string
 *           description: The name of the warehouse.
 *           example: New Warehouse
 *         isRefrigerated:
 *           type: boolean
 *           description: Indicates if the warehouse is refrigerated or not.
 *           example: false
 *         locationId:
 *           type: integer
 *           description: The ID of the location.
 *           example: 1
 *     UpdateWarehouse:
 *       type: object
 *       properties:
 *         warehouseName:
 *           type: string
 *           description: The name of the warehouse.
 *           example: Updated Warehouse Name
 *         isRefrigerated:
 *           type: boolean
 *           description: Indicates if the warehouse is refrigerated or not.
 *           example: false
 *         locationId:
 *           type: integer
 *           description: The ID of the location.
 *           example: 1
 *
 * /warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     tags: [Warehouses]
 *     description: Create a new warehouse.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewWarehouse'
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Invalid warehouse data
 *
 * /warehouses/{warehouseId}:
 *   put:
 *     summary: Update warehouse by ID
 *     tags: [Warehouses]
 *     description: Update an existing warehouse by its ID.
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the warehouse to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWarehouse'
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Invalid warehouse data
 *       404:
 *         description: Warehouse not found
 */

router.post("", asyncHandler(warehouseController.createWarehouse));

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateWarehouse:
 *       type: object
 *       properties:
 *         warehouseName:
 *           type: string
 *           description: The name of the warehouse.
 *           example: Updated Warehouse Name
 *         isRefrigerated:
 *           type: boolean
 *           description: Indicates if the warehouse is refrigerated or not.
 *           example: false
 *         locationId:
 *           type: integer
 *           description: The ID of the location.
 *           example: 1
 *     Warehouse:
 *       type: object
 *       properties:
 *         warehouseId:
 *           type: integer
 *           description: The ID of the warehouse.
 *         warehouseName:
 *           type: string
 *           description: The name of the warehouse.
 *         isRefrigerated:
 *           type: boolean
 *           description: Indicates if the warehouse is refrigerated or not.
 *         location:
 *           type: object
 *           properties:
 *             locationId:
 *               type: integer
 *               description: The ID of the location.
 *             locationName:
 *               type: string
 *               description: The name of the location.
 *             locationAddress:
 *               type: string
 *               description: The address of the location.
 *
 * /warehouses/{warehouseId}:
 *   put:
 *     summary: Update warehouse by ID
 *     tags: [Warehouses]
 *     description: Update an existing warehouse by its ID.
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the warehouse to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWarehouse'
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Invalid warehouse data
 *       404:
 *         description: Warehouse not found
 */

router.put("/:warehouseId", asyncHandler(warehouseController.updateWarehouse));

/**
 * @swagger
 * /warehouses/{warehouseId}:
 *   delete:
 *     summary: Delete warehouse by ID
 *     tags: [Warehouses]
 *     description: Delete an existing warehouse by its ID.
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Warehouse deleted successfully
 *       404:
 *         description: Warehouse not found
 */

router.delete(
    "/:warehouseId",
    asyncHandler(warehouseController.deleteWarehouse)
);

module.exports = router;
