const { BadRequestError, NotFoundError } = require("../../core/error.response");
const { getAllUnit } = require("../../models/repositories/unit.repo");

class UnitService {
    static getListUnit = async ({ page, limit }) => {
        const offset = (page - 1) * limit;
        const { rows: listUnit, count } = await getAllUnit(offset, limit);
        return {
            items:
                listUnit &&
                listUnit.map((unit) => {
                    return {
                        id: unit.id,
                        name: unit.name,
                    };
                }),
            meta: {
                itemsPerPage: parseInt(limit),
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    };
}

module.exports = UnitService;
