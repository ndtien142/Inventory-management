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
const { createKeyToken } = require("../../models/repositories/keyToken.repo");

class AccessService {
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
