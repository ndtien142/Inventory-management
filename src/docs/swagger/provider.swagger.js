/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       properties:
 *         providerID:
 *           type: integer
 *         providerName:
 *           type: string
 *         providerAddress:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewProvider:
 *       type: object
 *       properties:
 *         providerName:
 *           type: string
 *         providerAddress:
 *           type: string
 *       required:
 *         - providerName
 *         - providerAddress
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateProvider:
 *       type: object
 *       properties:
 *         providerName:
 *           type: string
 *         providerAddress:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API endpoints for managing providers
 */

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Get all providers
 *     tags: [Providers]
 *     description: Retrieve a list of all providers.
 *     responses:
 *       200:
 *         description: A list of providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 */
