"use strict";

const express = require("express");
const customerController = require("../../controllers/customer.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API endpoints for managing customers
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     description: Retrieve a list of all customers.
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

router.get("", asyncHandler(customerController.getAllCustomers));

/**
 * @swagger
 * /customers/{customerId}:
 *   get:
 *     summary: Get customer by Id
 *     tags: [Customers]
 *     description: Retrieve a customer by their Id.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer details by Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 */

router.get("/:customerId", asyncHandler(customerController.getCustomerById));

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     description: Create a new customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCustomer'
 *     responses:
 *       200:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request (e.g., customer already exists)
 */

router.post("", asyncHandler(customerController.createCustomer));

/**
 * @swagger
 * /customers/{customerId}:
 *   put:
 *     summary: Update customer by Id
 *     tags: [Customers]
 *     description: Update an existing customer by their Id.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomer'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 */

router.put("/:customerId", asyncHandler(customerController.updateCustomer));

/**
 * @swagger
 * /customers/{customerId}:
 *   delete:
 *     summary: Delete customer by Id
 *     tags: [Customers]
 *     description: Delete an existing customer by their Id.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */

router.delete("/:customerId", asyncHandler(customerController.deleteCustomer));

module.exports = router;
