"user strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createTokenPair, verifyJWT } = require("../../auth/authUtils");
const { getInfoData, generateUserCode } = require("../../utils");
const {
    BadRequestError,
    AuthFailureError,
    ForbiddenError,
} = require("../../core/error.response");
const { getRoleByName } = require("../../models/repositories/role.repo");
const {
    createAccount,
    getAccountByUsername,
} = require("../../models/repositories/account.repo");
const {
    createKeyToken,
    removeKeyTokenByUserCode,
} = require("../../models/repositories/keyToken.repo");

class AccessService {
    // static handlerRefreshTokenV2 = async ({ refreshToken, user, keyStore }) => {
    //     const { userId, email } = user;

    //     if (keyStore.refreshTokensUsed.includes(refreshToken)) {
    //         await KeyTokenService.deleteKeyById(userId);
    //         throw new ForbiddenError(
    //             "Something wrong happened!! Please login again"
    //         );
    //     }

    //     if (keyStore.refreshToken !== refreshToken)
    //         throw new AuthFailureError("Email not registered!");

    //     // check UserId
    //     const foundEmail = await findByEmail({ email });

    //     if (!foundEmail) throw new AuthFailureError("Email not registered 2!");

    //     // create new token pair
    //     const tokens = await createTokenPair(
    //         { userId, email },
    //         keyStore.publicKey,
    //         keyStore.privateKey
    //     );

    //     // update token to token used
    //     await KeyTokenService.updateTokenByRefreshToken(
    //         tokens.refreshToken,
    //         refreshToken
    //     );

    //     return {
    //         user,
    //         tokens: tokens,
    //     };
    // };

    static logout = async ({ userCode }) => {
        const delKeyStore = await removeKeyTokenByUserCode(userCode);
        return delKeyStore;
    };
    /*
        1 - Check email in database
        2 - match password
        3 - create access token and refresh token and save
        4 - generate tokens
        5 - get data return login
    */
    static login = async ({ username, password, refreshToken = null }) => {
        // 1
        const foundAccount = await db.Account.findOne({ where: { username } });
        if (!foundAccount) throw new BadRequestError("Username not registered");

        // 2
        const matchPassword = await bcrypt.compare(
            password,
            foundAccount.password
        );
        if (!matchPassword) throw new AuthFailureError("Authentication Error");

        // 3
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                // public key cryptographic standard
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                // public key cryptographic standard
                type: "pkcs1",
                format: "pem",
            },
        });

        // 4
        const tokens = await createTokenPair(
            { userCode: foundAccount.user_code, username },
            publicKey,
            privateKey
        );
        await createKeyToken({
            userCode: foundAccount.user_code,
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
        });
        return {
            code: 200,
            tokens,
            user: {
                userCode: foundAccount.user_code,
                username: foundAccount.username,
            },
        };
    };

    static signUp = async ({ username, password, roleName }) => {
        // step 1: check username exist
        const existingAccount = await getAccountByUsername(username);
        if (existingAccount) {
            throw new BadRequestError("Error: Username already registered!");
        }
        // Step 2: hashing password
        const passwordHash = await bcrypt.hash(password, 10);

        let role;
        if (roleName) {
            role = await getRoleByName(roleName);
            if (!role) {
                throw new BadRequestError("Role not found");
            }
        } else {
            role = await getRoleByName(roleName);
            if (!role) {
                throw new BadRequestError("Default role not found");
            }
        }
        const newAccount = await createAccount({
            userCode: generateUserCode(),
            username,
            password: passwordHash,
            roleId: role.id,
        });

        if (newAccount) {
            // created privateKey, publicKey
            // use has private key
            // system store public key
            // private key use to sync token
            // public key use to verify token
            const { privateKey, publicKey } = crypto.generateKeyPairSync(
                "rsa",
                {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        // public key cryptographic standard
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        // public key cryptographic standard
                        type: "pkcs1",
                        format: "pem",
                    },
                }
            );
            // if exist handle save to collection KeyStore
            const publicKeyString = await createKeyToken({
                userCode: newAccount.user_code,
                publicKey,
                privateKey,
            });

            if (!publicKeyString) {
                throw new BadRequestError("Public key string error");
            }

            const publicKeyObject = crypto.createPublicKey(publicKeyString);
            // create token pair
            const tokens = await createTokenPair(
                { userCode: newAccount.user_code, username },
                publicKeyObject,
                privateKey
            );

            return {
                code: 201,
                user: getInfoData({
                    fields: ["user_code", "username", "is_active", "is_block"],
                    object: newAccount,
                }),
                tokens: tokens,
            };
        }
        return {
            code: 201,
            metadata: null,
        };
    };
}

module.exports = AccessService;
