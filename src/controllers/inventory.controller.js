"use strict";

const { SuccessResponse } = require("../core/success.response");
const InventoryService = require("../services/inventory.service");

class InventoryController {
    async getAllInventories(req, res, next) {
        const inventories = await InventoryService.getAllInventories();
        new SuccessResponse({
            message: "Get all inventories success!",
            metadata: inventories,
        }).send(res);
    }

    async getInventoryById(req, res, next) {
        const inventoryId = parseInt(req.params.inventoryId);
        const inventory = await InventoryService.getInventoryById(inventoryId);
        new SuccessResponse({
            message: "Get inventory by ID success!",
            metadata: inventory,
        }).send(res);
    }

    async createInventory(req, res, next) {
        const inventoryData = req.body;
        const inventory = await InventoryService.createInventory(inventoryData);
        new SuccessResponse({
            message: "Create new inventory success!",
            metadata: inventory,
        }).send(res);
    }

    async updateInventory(req, res, next) {
        const inventoryId = parseInt(req.params.inventoryId);
        const inventoryData = req.body;
        const inventory = await InventoryService.updateInventory(
            inventoryId,
            inventoryData
        );
        new SuccessResponse({
            message: "Update inventory success!",
            metadata: inventory,
        }).send(res);
    }

    async deleteInventory(req, res, next) {
        const inventoryId = parseInt(req.params.inventoryId);
        const inventory = await InventoryService.deleteInventory(inventoryId);
        new SuccessResponse({
            message: "Delete inventory success!",
            metadata: inventory,
        }).send(res);
    }
}

module.exports = new InventoryController();
