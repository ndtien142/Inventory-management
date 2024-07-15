"use strict";

const Provider = require("./provider.model");

class Purchase {
    constructor({
        id,
        provider,
        expectedArrivalDate,
        status,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.provider = provider instanceof Provider ? provider : null;
        this.expectedArrivalDate = expectedArrivalDate;
        this.status = status; // Enum: "pending", "processing", "shipped", "delivered"
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Purchase;
