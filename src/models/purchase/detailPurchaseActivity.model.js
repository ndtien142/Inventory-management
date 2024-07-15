"use strict";

const Account = require("../authentication/account.model");
const Purchase = require("./purchase.model");

class DetailPurchaseActivity {
    constructor({ id, purchase, account, status, updateTime, createTime }) {
        this.id = id;
        this.purchase = purchase instanceof Purchase ? purchase : null;
        this.account = account instanceof Account ? account : null;
        this.status = status; // Enum: "pending", "processing", "shipped", "delivered"
        this.updateTime = updateTime;
        this.createTime = createTime;
    }
}

module.exports = DetailPurchaseActivity;
