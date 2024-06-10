"use strict";

const Customer = require("./customer.model");

class Delivery {
    constructor(deliveryID, salesDate, customer) {
        this.deliveryID = deliveryID;
        this.salesDate = salesDate;
        this.customer =
            customer instanceof Customer ? customer : new Customer();
    }
}

module.exports = Delivery;
