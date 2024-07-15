"use strict";

const Account = require("../authentication/account.model");

class Cart {
    constructor({ id, account, total, createTime, updateTime }) {
        this.id = id;
        this.account = account instanceof Account ? account : null;
        this.total = total;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Cart;
