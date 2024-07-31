const { NotFoundError } = require("../../core/error.response");
const {
    getAllProviders,
    getProviderById,
    createNewProvider,
    updateProvider,
} = require("../../models/repositories/provider.repo");
const { createNewProviderSchema } = require("./provider.schema");

class ProviderService {
    static getListProvider = async ({ page = 1, limit = 20 }) => {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { rows: providers, count } = await getAllProviders({
            offset,
            limit,
        });
        return {
            items: providers.map((provider) => {
                return {
                    id: provider.id,
                    name: provider.name,
                    contactInfo: provider.contact_info,
                    isActive: provider.is_active,
                };
            }),
            meta: {
                currentPage: parseInt(page),
                itemsPerPage: parseInt(limit),
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(limit)),
            },
        };
    };
    static getDetailProvider = async (providerId) => {
        const foundProvider = await getProviderById(providerId);
        if (!foundProvider) throw new NotFoundError("Provider not found");
        return {
            id: foundProvider.id,
            name: foundProvider.name,
            contactInfo: foundProvider.contact_info,
            isActive: foundProvider.is_active,
        };
    };
    static createNewProvider = async ({ name, contactInfo, isActive }) => {
        const { error, value } = createNewProviderSchema().validate({
            name,
            contactInfo,
            isActive,
        });
        const newProvider = await createNewProvider(value);
        return {
            id: newProvider.id,
            name: newProvider.name,
            contactInfo: newProvider.contact_info,
            isActive: newProvider.is_active,
        };
    };
    static updateProvider = async (
        providerId,
        { name, contactInfo, isActive }
    ) => {
        const updatedProvider = await getProviderById(providerId);
        if (!updatedProvider) throw new NotFoundError("Provider not found");
        const newUpdate = await updateProvider(providerId, {
            name,
            contactInfo,
            isActive,
        });
        return {
            id: newUpdate.id,
            name: newUpdate.name,
            contactInfo: newUpdate.contact_info,
            isActive: newUpdate.is_active,
        };
    };
}

module.exports = ProviderService;
