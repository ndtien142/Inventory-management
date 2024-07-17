const { BadRequestError, NotFoundError } = require("../../core/error.response");
const db = require("../../dbs/init.sqlserver");
const { getInfoData } = require("../../utils");

class RoleService {
    static createRole = async ({
        roleName,
        roleDescription,
        isActive = true,
    }) => {
        const findRole = await db.Role.findOne({
            where: { role_name: roleName },
        });
        if (findRole) throw new BadRequestError("Role already exists!");
        const result = await db.Role.create({
            role_name: roleName,
            role_description: roleDescription,
            is_active: isActive,
        });
        return {
            id: result.id,
            roleName: result.role_name,
            roleDescription: result.role_description,
            isActive: result.is_active,
            createTime: result.create_time,
            updateTime: result.update_time,
        };
    };
    static getRoleById = async (id) => {
        const result = await db.Role.findByPk(parseInt(id));
        if (!result) throw new NotFoundError("Role not found");
        return getInfoData({
            fields: [
                "id",
                "role_name",
                "role_description",
                "is_active",
                "create_time",
                "update_time",
            ],
            object: result,
        });
    };
    static getAllRoles = async () => {
        const result = await db.Role.findAll();
        if (!result) throw new NotFoundError("Role not found");
        return result.map((item) =>
            getInfoData({
                fields: [
                    "id",
                    "role_name",
                    "role_description",
                    "is_active",
                    "create_time",
                    "update_time",
                ],
                object: item,
            })
        );
    };
    static updateRole = async ({ id, roleName, roleDescription }) => {
        const result = await db.Role.update(
            { role_name: roleName, role_description: roleDescription },
            { where: { id: id } }
        );
        return getInfoData({
            fields: [
                "id",
                "role_name",
                "role_description",
                "is_active",
                "create_time",
                "update_time",
            ],
            object: result,
        });
    };
    static deleteRole = async (id) => {
        const result = await db.Role.destroy({ where: { id: id } });
        return getInfoData({
            fields: [
                "id",
                "role_name",
                "role_description",
                "is_active",
                "create_time",
                "update_time",
            ],
            object: result,
        });
    };
    static getRoleByName = async (roleName) => {
        const result = db.Role.findOne({ where: { role_name: roleName } });
        if (!result) throw new NotFoundError("Role not found");
        return getInfoData({
            fields: [
                "id",
                "role_name",
                "role_description",
                "is_active",
                "create_time",
                "update_time",
            ],
            object: result,
        });
    };
}

module.exports = RoleService;
