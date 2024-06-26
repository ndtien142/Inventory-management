"use strict";

const AccessService = require("../services/authentication/access.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class AccessController {
    handlerRefreshToken = async (req, res, next) => {
        // new SuccessResponse({
        //     message: "Get refresh token success!",
        //     metadata: await AccessService.handlerRefreshToken(
        //         req.body.refreshToken
        //     ),
        // }).send(res);

        // v2 fixed, no need access token
        new SuccessResponse({
            message: "Get refresh token success!",
            metadata: await AccessService.handlerRefreshTokenV2({
                refreshToken: req.refreshToken,
                keyStore: req.keyStore,
                user: req.user,
            }),
        }).send(res);
    };

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: "Logout success!",
            metadata: await AccessService.logout({ keyStore: req.keyStore }),
        }).send(res);
    };

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    signUp = async (req, res, next) => {
        new CREATED({
            message: "Registered OK",
            metadata: await AccessService.signUp(req.body),
        }).send(res);
    };

    profile = async (req, res, next) => {
        new CREATED({
            message: "Get Profile OK",
            metadata: await AccessService.signUp(req.user.userId),
        }).send(res);
    };

    groupPolicies = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.policiesUser(req.user.userId),
        }).send(res);
    };
}

module.exports = new AccessController();
