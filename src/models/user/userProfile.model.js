"use strict";

const Account = require("../authentication/account.model");

class UserProfile {
    constructor({
        id,
        account,
        firstName,
        lastName,
        phoneNumber,
        address,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.user = account instanceof Account ? account : new Account();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = UserProfile;
