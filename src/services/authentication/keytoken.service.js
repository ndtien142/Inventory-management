"use strict";

const db = require("../../models/authentication/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({
        userCode,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            const tokens = await db.KeyToken.update({
                privateKey,
                publicKey,
                refreshToken,
                fk_user_code: userCode,
            });

            return tokens ? tokens.publicKey : null;
        } catch (err) {
            return err;
        }
    };

    static findByUserId = async (userCode) => {
        return await db.KeyToken.findOne({ where: { fk_user_code: userCode } });
    };

    static removeKeyById = async (userCode) => {
        const result = await db.KeyToken.destroy({
            where: { fk_user_code: userCode },
        });
        return result;
    };

    // static findByRefreshTokenUsed = async (refreshToken) => {
    //     return await keyTokenModel
    //         .findOne({ refreshTokensUsed: refreshToken })
    //         .lean();
    // };

    // static findByRefreshToken = async (refreshToken) => {
    //     return await keyTokenModel.findOne({ refreshToken }).lean();
    // };

    // static deleteKeyById = async (id) => {
    //     return await keyTokenModel.findOneAndDelete({
    //         user: new Types.ObjectId(id),
    //     });
    // };

    // static updateTokenByRefreshToken = async (
    //     newRefreshToken,
    //     refreshToken
    // ) => {
    //     const result = await keyTokenModel.findOneAndUpdate(
    //         { refreshToken: refreshToken },
    //         {
    //             $set: {
    //                 refreshToken: newRefreshToken,
    //             },
    //             $push: {
    //                 refreshTokensUsed: refreshToken,
    //             },
    //         },
    //         { new: true }
    //     );
    //     return result;
    // };
}

module.exports = KeyTokenService;
