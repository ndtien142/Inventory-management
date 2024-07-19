const db = require("../../dbs/init.sqlserver");

const createKeyToken = async ({
    userCode,
    privateKey,
    publicKey,
    refreshToken = "",
}) => {
    try {
        const tokens = await db.KeyToken.create({
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

const updateKeyToken = async ({
    id,
    privateKey,
    publicKey,
    refreshToken = "",
}) => {
    return await db.KeyToken.update(
        {
            privateKey,
            publicKey,
            refreshToken,
        },
        { where: { id } }
    );
};

const findKeyTokenByUserCode = async (userCode) => {
    return await db.KeyToken.findOne({ where: { fk_user_code: userCode } });
};

const removeKeyTokenByUserCode = async (userCode) => {
    const result = await db.KeyToken.destroy({
        where: { fk_user_code: userCode },
    });
    return result;
};

module.exports = {
    createKeyToken,
    findKeyTokenByUserCode,
    removeKeyTokenByUserCode,
    updateKeyToken,
};
