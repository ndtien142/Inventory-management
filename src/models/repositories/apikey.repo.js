const db = require("../../dbs/init.sqlserver");

const findByKey = async (key) => {
    return await db.ApiKeys.findOne({ where: { key } });
};

module.exports = {
    findByKey,
};
