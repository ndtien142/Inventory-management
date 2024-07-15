"use strict";

const Account = require("../authentication/account.model");

class userAddress {
    constructor({
        id,
        account,
        addressLine1,
        addressLine2,
        city,
        stateProvince,
        postalCode,
        country,
        isDeleted,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.account = account instanceof Account ? account : new Account();
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.stateProvince = stateProvince;
        this.postalCode = postalCode;
        this.country = country;
        this.isDeleted = isDeleted;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = userAddress;
