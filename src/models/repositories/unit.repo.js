const db = require("../../dbs/init.sqlserver");

const createNewUnit = async ({ name }) => {
    return await db.Unit.create({
        name,
        create_time: new Date(),
        update_time: new Date(),
    });
};
const getUnitById = async (id) => {
    return await db.Unit.findByPk(parseInt(id));
};
const getAllUnit = async () => {
    return await db.Unit.findAll();
};
const updateUnit = async ({ id, name }) => {
    return await db.Role.update(
        {
            name,
            update_time: new Date(),
        },
        { where: { id: id } }
    );
};
const deleteUnit = async (id) => {
    return await db.Role.destroy({ where: { id: id } });
};
const getUnitByName = async (unitName) => {
    return db.Unit.findOne({ where: { name: unitName } });
};

module.exports = {
    createNewUnit,
    getUnitById,
    getAllUnit,
    updateUnit,
    deleteUnit,
    getUnitByName,
};
