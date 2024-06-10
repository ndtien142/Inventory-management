const dbService = require("../services/database.service");

async function getAllLocations() {
    const query = `
        SELECT * FROM Location;
    `;
    return await dbService.executeQuery(query);
}

async function getLocationById(locationId) {
    const query = `
        SELECT * FROM Location
        WHERE LocationID = @locationId;
    `;
    const params = [
        { name: "locationId", type: dbService.TYPES.Int, value: locationId },
    ];
    return await dbService.executeQuery(query, params);
}

async function addLocation(location) {
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
    return await dbService.executeQuery(query, params);
}

async function updateLocation(locationId, location) {
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
    return await dbService.executeQuery(query, params);
}

async function deleteLocation(locationId) {
    const query = `
        DELETE FROM Location
        WHERE LocationID = @locationId;
    `;
    const params = [
        { name: "locationId", type: dbService.TYPES.Int, value: locationId },
    ];
    return await dbService.executeQuery(query, params);
}

module.exports = {
    getAllLocations,
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation,
};
