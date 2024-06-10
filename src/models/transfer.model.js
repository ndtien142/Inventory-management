"use strict";

const Warehouse = require("./warehouse.model");
const Product = require("./product.model");

class Transfer {
    constructor(
        transferId,
        transferQuantity,
        sentDate,
        receivedDate,
        product,
        sourceWarehouse,
        destinationWarehouse
    ) {
        this.transferId = transferId;
        this.transferQuantity = transferQuantity;
        this.sentDate = sentDate;
        this.receivedDate = receivedDate;
        this.product = product instanceof Product ? product : new Product();
        this.sourceWarehouse =
            sourceWarehouse instanceof Warehouse
                ? sourceWarehouse
                : new Warehouse();
        this.destinationWarehouse =
            destinationWarehouse instanceof Warehouse
                ? destinationWarehouse
                : new Warehouse();
    }
}

module.exports = Transfer;
