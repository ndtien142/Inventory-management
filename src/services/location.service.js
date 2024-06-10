const Joi = require("joi");
const LocationRepository = require("../repositories/location.repo");
const Location = require("../models/location.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class LocationService {
    static async getAllLocations() {
        const locations = await LocationRepository.getAllLocations();
        if (locations.length === 0) {
            throw new NotFoundError("No locations found");
        }
        const mappedLocations = locations.map(
            (location) =>
                new Location(
                    location.LocationID,
                    location.LocationName,
                    location.LocationAddress
                )
        );
        return mappedLocations;
    }

    static async getLocationById(locationId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(locationId);
        if (error) {
            throw new BadRequestError(`Invalid locationId: ${error.message}`);
        }

        const location = await LocationRepository.getLocationById(locationId);
        if (!location) {
            throw new NotFoundError(`Location with ID ${locationId} not found`);
        }
        return new Location(
            location.LocationID,
            location.LocationName,
            location.LocationAddress
        );
    }

    static async createLocation(locationData) {
        const schema = Joi.object({
            locationName: Joi.string().required(),
            locationAddress: Joi.string().required(),
        });

        const { error } = schema.validate(locationData);
        if (error) {
            throw new BadRequestError(
                `Invalid location data: ${error.message}`
            );
        }

        const newLocation = await LocationRepository.addLocation(locationData);
        return new Location(
            newLocation.LocationID,
            newLocation.LocationName,
            newLocation.LocationAddress
        );
    }

    static async updateLocation(locationId, locationData) {
        const locationIdSchema = Joi.number().integer().min(1).required();
        const schema = Joi.object({
            locationName: Joi.string(),
            locationAddress: Joi.string(),
        }).min(1);

        const { error: locationIdError } =
            locationIdSchema.validate(locationId);
        if (locationIdError) {
            throw new BadRequestError(
                `Invalid locationId: ${locationIdError.message}`
            );
        }

        const { error: locationDataError } = schema.validate(locationData);
        if (locationDataError) {
            throw new BadRequestError(
                `Invalid location data: ${locationDataError.message}`
            );
        }

        const updatedLocation = await LocationRepository.updateLocation(
            locationId,
            locationData
        );

        if (!updatedLocation) {
            throw new NotFoundError(`Location with ID ${locationId} not found`);
        }
        return new Location(
            updatedLocation.LocationID,
            updatedLocation.LocationName,
            updatedLocation.LocationAddress
        );
    }

    static async deleteLocation(locationId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(locationId);
        if (error) {
            throw new BadRequestError(`Invalid locationId: ${error.message}`);
        }

        const deletedLocation =
            await LocationRepository.deleteLocation(locationId);
        if (!deletedLocation) {
            throw new NotFoundError(`Location with ID ${locationId} not found`);
        }
        return new Location(
            deletedLocation.LocationID,
            deletedLocation.LocationName,
            deletedLocation.LocationAddress
        );
    }
}

module.exports = LocationService;
