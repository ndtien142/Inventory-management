const express = require("express");
const providerController = require("../../controllers/provider.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(providerController.getAllProviders));

/**
 * @swagger
 * /providers/{providerId}:
 *   get:
 *     summary: Get provider by ID
 *     tags: [Providers]
 *     description: Retrieve a provider by their ID.
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Provider details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Provider not found
 */

router.get("/:providerId", asyncHandler(providerController.getProviderById));

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     description: Create a new provider.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProvider'
 *     responses:
 *       200:
 *         description: Provider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       400:
 *         description: Bad request (e.g., provider already exists)
 */

router.post("/", asyncHandler(providerController.createProvider));

/**
 * @swagger
 * /providers/{providerId}:
 *   put:
 *     summary: Update provider by ID
 *     tags: [Providers]
 *     description: Update an existing provider by their ID.
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProvider'
 *     responses:
 *       200:
 *         description: Provider updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Provider not found
 */

router.put("/:providerId", asyncHandler(providerController.updateProvider));

/**
 * @swagger
 * /providers/{providerId}:
 *   delete:
 *     summary: Delete provider by ID
 *     tags: [Providers]
 *     description: Delete an existing provider by their ID.
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Provider deleted successfully
 *       404:
 *         description: Provider not found
 */

router.delete("/:providerId", asyncHandler(providerController.deleteProvider));

module.exports = router;
