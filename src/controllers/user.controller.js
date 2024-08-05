"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const userService = require("../services/user/user.service");

class UserController {
    createUser = async (req, res, next) => {
        new CREATED({
            message: "Create new user successfully",
            metadata: await userService.createUser(req.body),
        }).send(res);
    };

    getUserById = async (req, res, next) => {
        new SuccessResponse({
            message: "Get user by id successfully",
            metadata: await userService.getUser(req.params.id),
        }).send(res);
    };

    updateUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Update user successfully",
            metadata: await userService.updateUser({
                userCode: req.params.id,
                ...req.body,
            }),
        }).send(res);
    };

    markUserAsDeleted = async (req, res, next) => {
        new SuccessResponse({
            message: "Mark user as deleted successfully",
            metadata: await userService.markUserAsDeleted(req.params.id),
        }).send(res);
    };

    markUserAsBlocked = async (req, res, next) => {
        new SuccessResponse({
            message: "Update user block status successfully",
            metadata: await userService.markUserAsBlocked(
                req.params.id,
                req.body.isBlock
            ),
        }).send(res);
    };

    getAllUsers = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all users successfully",
            metadata: await userService.getUsers(req.query),
        }).send(res);
    };
}

module.exports = new UserController();
