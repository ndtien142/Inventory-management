"use strict";

const WarehouseService = require("../services/warehouse.service");
const { SuccessResponse } = require("../core/success.response");

class WarehouseController {
    getAllWarehouses = async (req, res) => {
        const warehouses = await WarehouseService.getAllWarehouses();
        new SuccessResponse({
            message: "Get all warehouses success!",
            metadata: warehouses,
        }).send(res);
    };

    getWarehouseById = async (req, res) => {
        const { warehouseId } = req.params;
        const warehouse = await WarehouseService.getWarehouseById(warehouseId);
        new SuccessResponse({
            message: "Get warehouse by ID success!",
            metadata: warehouse,
        }).send(res);
    };

    createWarehouse = async (req, res) => {
        const warehouseData = req.body;
        const newWarehouse =
            await WarehouseService.createWarehouse(warehouseData);
        new SuccessResponse({
            message: "Create new warehouse success!",
            metadata: newWarehouse,
        }).send(res);
    };

    updateWarehouse = async (req, res) => {
        const { warehouseId } = req.params;
        const warehouseData = req.body;
        const updatedWarehouse = await WarehouseService.updateWarehouse(
            warehouseId,
            warehouseData
        );
        new SuccessResponse({
            message: "Update warehouse success!",
            metadata: updatedWarehouse,
        }).send(res);
    };

    deleteWarehouse = async (req, res) => {
        const { warehouseId } = req.params;
        const deletedWarehouse =
            await WarehouseService.deleteWarehouse(warehouseId);
        new SuccessResponse({
            message: "Delete warehouse success!",
            metadata: deletedWarehouse,
        }).send(res);
    };
}

module.exports = new WarehouseController();
