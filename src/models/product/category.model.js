"use strict";

class Category {
    constructor({
        id,
        name,
        description,
        parentCategory,
        createTime,
        updateTime,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.parentCategory =
            parentCategory instanceof Category ? parentCategory : null;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

module.exports = Category;
