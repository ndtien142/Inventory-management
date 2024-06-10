"use strict";

const Warehouse = require("./warehouse.model");
const Product = require("./product.model");
const Delivery = require("./delivery.model");

class DeliveryDetail {
    constructor(
        deliveryDetailId,
        deliveryQuantity,
        expectedDate,
        actualDate,
        warehouse,
        product,
        delivery
    ) {
        this.deliveryDetailId = deliveryDetailId;
        this.deliveryQuantity = deliveryQuantity;
        this.expectedDate = expectedDate;
        this.actualDate = actualDate;
        this.warehouse =
            warehouse instanceof Warehouse ? warehouse : new Warehouse();

        this.product = product instanceof Product ? product : new Product();
        this.delivery =
            delivery instanceof Delivery ? delivery : new Delivery();
    }
}

module.exports = DeliveryDetail;
