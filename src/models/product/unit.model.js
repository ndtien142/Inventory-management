"use strict";

class Unit {
    constructor({ id, name, createTime, updateTime }) {
        this.id = id;
        this.name = name;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Unit;
