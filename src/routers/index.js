"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// check api key
// router.use(apiKey);
// check permissions
// router.use(permission("0000"));

/**
 * @swagger
 * /v1/api:
 *   post:
 *     summary: User signup
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.use("/v1/api", require("./access"));

module.exports = router;
