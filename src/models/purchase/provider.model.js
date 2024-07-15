"use strict";

class Provider {
    constructor({ id, name, contactInfo, isActive, createTime, updateTime }) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.isActive = isActive;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Provider;
