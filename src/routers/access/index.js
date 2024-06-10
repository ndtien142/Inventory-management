"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @openapi
 * /account/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/account/signup", asyncHandler(accessController.signUp));

/**
 * @openapi
 * /account/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Login to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/account/login", asyncHandler(accessController.login));

// authentication middleware
router.use(authenticationV2);

/**
 * @openapi
 * /account/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     description: Logout from the application.
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/account/logout", asyncHandler(accessController.logout));

/**
 * @openapi
 * /account/group-policies:
 *   get:
 *     tags: [Auth]
 *     summary: Get group policies
 *     description: Retrieve the group policies for the logged-in user.
 *     responses:
 *       200:
 *         description: Group policies retrieved successfully
 */
router.get(
    "/account/group-policies",
    asyncHandler(accessController.groupPolicies)
);

/**
 * @openapi
 * /account/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get user profile
 *     description: Retrieve the profile information for the logged-in user.
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get("/account/profile", asyncHandler(accessController.profile));

/**
 * @openapi
 * /account/handlerRefreshToken:
 *   post:
 *     tags: [Auth]
 *     summary: Handle refresh token
 *     description: Refresh the access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 */
router.post(
    "/account/handlerRefreshToken",
    asyncHandler(accessController.handlerRefreshToken)
);

module.exports = router;
