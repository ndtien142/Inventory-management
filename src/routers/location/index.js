"use strict";

const express = require("express");
const locationController = require("../../controllers/location.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API endpoints for managing locations
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     description: Retrieve a list of all locations.
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */

router.get("", asyncHandler(locationController.getAllLocations));

/**
 * @swagger
 * /locations/{locationId}:
 *   get:
 *     summary: Get location by Id
 *     tags: [Locations]
 *     description: Retrieve a location by its Id.
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location details by Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */

router.get("/:locationId", asyncHandler(locationController.getLocationById));

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     description: Create a new location.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewLocation'
 *     responses:
 *       200:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Bad request (e.g., location already exists)
 */

router.post("", asyncHandler(locationController.createLocation));

/**
 * @swagger
 * /locations/{locationId}:
 *   put:
 *     summary: Update location by Id
 *     tags: [Locations]
 *     description: Update an existing location by its Id.
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLocation'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */

router.put("/:locationId", asyncHandler(locationController.updateLocation));

/**
 * @swagger
 * /locations/{locationId}:
 *   delete:
 *     summary: Delete location by Id
 *     tags: [Locations]
 *     description: Delete an existing location by its Id.
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */

router.delete("/:locationId", asyncHandler(locationController.deleteLocation));

module.exports = router;
