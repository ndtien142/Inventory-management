const { BadRequestError, NotFoundError } = require("../../core/error.response");
const {
    getRoleByName,
    getRoleById,
    getAllRoles,
    updateRole,
    deleteRole,
    createRole,
} = require("../../models/repositories/role.repo");
const { getInfoData } = require("../../utils");

class RoleService {
    static createRole = async ({
        roleName,
        roleDescription,
        isActive = true,
    }) => {
        const findRole = await getRoleByName(roleName);
        if (findRole) throw new BadRequestError("Role already exists!");
        const result = await createRole({
            roleDescription,
            roleName,
            isActive,
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
        const result = await getRoleById(id);
        if (!result) throw new NotFoundError("Role not found");
        return {
            id: result.id,
            name: result.role_name,
            description: result.role_description,
            isActive: result.is_active,
            createTime: result.create_time,
            updateTime: result.update_time,
        };
    };
    static getAllRoles = async () => {
        const result = await getAllRoles();
        if (!result) throw new NotFoundError("Role not found");
        return result.map((item) => {
            return {
                id: item.id,
                name: item.role_name,
                description: item.role_description,
                isActive: item.is_active,
                createTime: item.create_time,
                updateTime: item.update_time,
            };
        });
    };
    static updateRole = async ({
        id,
        roleName,
        roleDescription,
        isActive = true,
    }) => {
        const result = await updateRole({
            id,
            roleName,
            roleDescription,
            isActive,
        });
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
        const result = await deleteRole(id);
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
        const result = await getRoleByName(roleName);
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
