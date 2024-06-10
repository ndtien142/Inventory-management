const dbService = require("../services/database.service");

function getAllLocations(callback) {
    const query = `
        SELECT * FROM Location;
    `;
    dbService.executeQuery(query, callback);
}

function getLocationById(locationId, callback) {
    const query = `
        SELECT * FROM Location
        WHERE LocationID = @locationId;
    `;
    const params = [
        { name: "locationId", type: dbService.TYPES.Int, value: locationId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function addLocation(location, callback) {
    const query = `
        INSERT INTO Location (LocationName, LocationAddress)
        VALUES (@locationName, @locationAddress);
    `;
    const params = [
        {
            name: "locationName",
            type: dbService.TYPES.VarChar,
            value: location.locationName,
        },
        {
            name: "locationAddress",
            type: dbService.TYPES.VarChar,
            value: location.locationAddress,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function updateLocation(locationId, location, callback) {
    const query = `
        UPDATE Location
        SET LocationName = @locationName,
            LocationAddress = @locationAddress
        WHERE LocationID = @locationId;
    `;
    const params = [
        { name: "locationId", type: dbService.TYPES.Int, value: locationId },
        {
            name: "locationName",
            type: dbService.TYPES.VarChar,
            value: location.locationName,
        },
        {
            name: "locationAddress",
            type: dbService.TYPES.VarChar,
            value: location.locationAddress,
        },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

function deleteLocation(locationId, callback) {
    const query = `
        DELETE FROM Location
        WHERE LocationID = @locationId;
    `;
    const params = [
        { name: "locationId", type: dbService.TYPES.Int, value: locationId },
    ];
    dbService.executePreparedStatement(query, params, callback);
}

module.exports = {
    getAllLocations,
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation,
};
