"use strict";

const Customer = require("./customer.model");

class Delivery {
    constructor(deliveryId, salesDate, customer) {
        this.deliveryId = deliveryId;
        this.salesDate = salesDate;
        this.customer =
            customer instanceof Customer ? customer : new Customer();
    }
}

module.exports = Delivery;
