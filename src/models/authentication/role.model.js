"use strict";

class Role {
    constructor({ id, name, description, createTime, updateTime }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Role;
