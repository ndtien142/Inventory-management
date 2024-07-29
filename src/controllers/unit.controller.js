const { SuccessResponse } = require("../core/success.response");
const unitService = require("../services/product/unit.service");

class UnitController {
    getAllUnit = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all units successfully",
            metadata: await unitService.getListUnit({
                page: req.query.page,
                limit: req.query.limit,
            }),
        }).send(res);
    };
}

module.exports = new UnitController();
