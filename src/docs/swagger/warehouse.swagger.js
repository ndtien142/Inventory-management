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
 *       required:
 *         - warehouseName
 *         - isRefrigerated
 *         - locationId
 */
