const Joi = require("joi");
const WarehouseRepository = require("../repositories/warehouse.repo");
const Warehouse = require("../models/warehouse.model");
const LocationService = require("./location.service");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const Location = require("../models/location.model");

class WarehouseService {
    static async getAllWarehouses() {
        const warehouses = await WarehouseRepository.getAllWarehouses();
        if (warehouses.length === 0) {
            throw new NotFoundError("No warehouses found");
        }
        const listWarehouses = warehouses.map(
            (warehouse) =>
                new Warehouse(
                    warehouse.WarehouseID,
                    warehouse.WarehouseName,
                    warehouse.IsRefrigerated,
                    new Location(
                        warehouse.LocationID,
                        warehouse.LocationName,
                        warehouse.LocationAddress
                    )
                )
        );
        return listWarehouses;
    }

    static async getWarehouseById(warehouseId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(warehouseId);
        if (error) {
            throw new BadRequestError(`Invalid warehouseId: ${error.message}`);
        }

        const warehouse =
            await WarehouseRepository.getWarehouseById(warehouseId);
        if (!warehouse) {
            throw new NotFoundError(
                `Warehouse with ID ${warehouseId} not found`
            );
        }
        return new Warehouse(
            warehouse.WarehouseID,
            warehouse.WarehouseName,
            warehouse.IsRefrigerated,
            new Location(
                warehouse.LocationID,
                warehouse.LocationName,
                warehouse.LocationAddress
            )
        );
    }

    static async createWarehouse(warehouseData) {
        const schema = Joi.object({
            warehouseName: Joi.string().required(),
            isRefrigerated: Joi.boolean().required(),
            location: Joi.object()
                .keys({
                    locationId: Joi.number().integer().min(1).required(),
                    locationName: Joi.string(),
                    locationAddress: Joi.string(),
                })
                .required(),
        });

        const { error } = schema.validate(warehouseData);
        if (error) {
            throw new BadRequestError(
                `Invalid warehouse data: ${error.message}`
            );
        }

        const foundWarehouse = await WarehouseRepository.getWarehouseByName(
            warehouseData.warehouseName
        );
        if (foundWarehouse?.length > 0) {
            throw new BadRequestError(
                `Warehouse with name ${warehouseData.warehouseName} already exists`
            );
        }

        // Check if location exists
        const location = await LocationService.getLocationById(
            warehouseData.location.locationId
        );

        const newWarehouseData = {
            warehouseName: warehouseData.warehouseName,
            isRefrigerated: warehouseData.isRefrigerated,
            locationId: warehouseData.location.locationId,
        };

        const newWarehouse =
            await WarehouseRepository.addWarehouse(newWarehouseData);
        return new Warehouse(
            newWarehouse.WarehouseID,
            newWarehouse.WarehouseName,
            newWarehouse.IsRefrigerated,
            location
        );
    }

    static async updateWarehouse(warehouseId, warehouseData) {
        const warehouseIdSchema = Joi.number().integer().min(1).required();
        const schema = Joi.object({
            warehouseName: Joi.string(),
            isRefrigerated: Joi.boolean(),
            location: Joi.object()
                .keys({
                    locationId: Joi.number().integer().min(1),
                    locationName: Joi.string(),
                    locationAddress: Joi.string(),
                })
                .min(1),
        }).min(1);

        const { error: warehouseIdError } =
            warehouseIdSchema.validate(warehouseId);
        if (warehouseIdError) {
            throw new BadRequestError(
                `Invalid warehouseId: ${warehouseIdError.message}`
            );
        }

        const { error: warehouseDataError } = schema.validate(warehouseData);
        if (warehouseDataError) {
            throw new BadRequestError(
                `Invalid warehouse data: ${warehouseDataError.message}`
            );
        }

        const location = await LocationService.getLocationById(
            warehouseData.location.locationId
        );

        const updatedWarehouseData = {
            warehouseName: warehouseData.warehouseName,
            isRefrigerated: warehouseData.isRefrigerated,
            locationId: warehouseData.location
                ? warehouseData.location.locationId
                : undefined,
        };

        const updatedWarehouse = await WarehouseRepository.updateWarehouse(
            warehouseId,
            updatedWarehouseData
        );
        if (!updatedWarehouse) {
            throw new NotFoundError(`Warehouse not found`);
        }
        return new Warehouse(
            updatedWarehouse.WarehouseID,
            updatedWarehouse.WarehouseName,
            updatedWarehouse.IsRefrigerated,
            location
        );
    }

    static async deleteWarehouse(warehouseId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(warehouseId);
        if (error) {
            throw new BadRequestError(`Invalid warehouseId: ${error.message}`);
        }

        const deletedWarehouse =
            await WarehouseRepository.deleteWarehouse(warehouseId);
        if (!deletedWarehouse) {
            throw new NotFoundError(
                `Warehouse with ID ${warehouseId} not found`
            );
        }
        return new Warehouse(
            deletedWarehouse.WarehouseID,
            deletedWarehouse.WarehouseName,
            deletedWarehouse.IsRefrigerated
        );
    }
}

module.exports = WarehouseService;
