"use strict";

const RoleService = require("../services/authentication/role.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class RoleController {
    getAllRoles = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all roles successfully",
            metadata: await RoleService.getAllRoles(),
        }).send(res);
    };
    getRoleById = async (req, res, next) => {
        new SuccessResponse({
            message: "Get role by id successfully",
            metadata: await RoleService.getRoleById(req.params.id),
        }).send(res);
    };
}

module.exports = new RoleController();
