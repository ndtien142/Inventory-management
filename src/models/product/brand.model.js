"use strict";

class Brand {
    constructor({ id, name, description, createTime, updateTime }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Brand;
