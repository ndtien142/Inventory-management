"use strict";

const LocationService = require("../services/location.service");
const { SuccessResponse } = require("../core/success.response");

class LocationController {
    // Get all locations
    getAllLocations = async (req, res) => {
        new SuccessResponse({
            message: "Get all locations success!",
            metadata: await LocationService.getAllLocations(),
        }).send(res);
    };

    // Get location by ID
    getLocationById = async (req, res) => {
        new SuccessResponse({
            message: "Get location by ID success!",
            metadata: await LocationService.getLocationById(
                parseInt(req.params.locationId)
            ),
        }).send(res);
    };

    // Create new location
    createLocation = async (req, res) => {
        new SuccessResponse({
            message: "Create new location success!",
            metadata: await LocationService.createLocation(req.body),
        }).send(res);
    };

    // Update location
    updateLocation = async (req, res) => {
        new SuccessResponse({
            message: "Update location success!",
            metadata: await LocationService.updateLocation(
                parseInt(req.params.locationId),
                req.body
            ),
        }).send(res);
    };

    // Delete location
    deleteLocation = async (req, res) => {
        new SuccessResponse({
            message: "Delete location success!",
            metadata: await LocationService.deleteLocation(
                parseInt(req.params.locationId)
            ),
        }).send(res);
    };
}

module.exports = new LocationController();
