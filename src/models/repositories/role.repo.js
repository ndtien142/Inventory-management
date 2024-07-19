const db = require("../../dbs/init.sqlserver");

const createRole = async ({ roleName, roleDescription, isActive }) => {
    return await db.Role.create({
        role_name: roleName,
        role_description: roleDescription,
        is_active: isActive,
    });
};
const getRoleById = async (id) => {
    return await db.Role.findByPk(parseInt(id));
};
const getAllRoles = async () => {
    return await db.Role.findAll();
};
const updateRole = async ({ id, roleName, roleDescription, isActive }) => {
    return await db.Role.update(
        {
            role_name: roleName,
            role_description: roleDescription,
            is_active: isActive,
        },
        { where: { id: id } }
    );
};
const deleteRole = async (id) => {
    return await db.Role.destroy({ where: { id: id } });
};
const getRoleByName = async (roleName) => {
    return db.Role.findOne({ where: { role_name: roleName } });
};

module.exports = {
    createRole,
    getRoleById,
    getAllRoles,
    updateRole,
    deleteRole,
    getRoleByName,
};
