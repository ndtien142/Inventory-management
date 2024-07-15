"use strict";

const Role = require("./role.model");

class Account {
    constructor({
        userCode,
        username,
        password,
        isActive,
        isBlock,
        role,
        createTime,
        updateTime,
    }) {
        this.customerId = userCode;
        this.customerName = username;
        this.customerAddress = password;
        this.isActive = isActive;
        this.isBlock = isBlock;
        this.role = role instanceof Role ? role : new Role();
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Account;
