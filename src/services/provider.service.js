const ProviderRepository = require("../repositories/provider.repo");
const Provider = require("../models/provider.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class ProviderService {
    static async getAllProviders() {
        const providers = await ProviderRepository.getAllProviders();
        return providers.map(
            (provider) =>
                new Provider(
                    provider.ProviderID,
                    provider.ProviderName,
                    provider.ProviderAddress
                )
        );
    }

    static async getProviderById(providerId) {
        const provider = await ProviderRepository.getProviderById(providerId);
        if (!provider) {
            throw new NotFoundError(`Provider not found`);
        }
        return new Provider(
            provider.ProviderID,
            provider.ProviderName,
            provider.ProviderAddress
        );
    }

    static async createProvider(providerData) {
        const existingProvider = await ProviderRepository.getProviderByName(
            providerData.providerName
        );
        if (existingProvider) {
            throw new BadRequestError(
                `Provider with name ${providerData.providerName} already exists`
            );
        }

        const newProvider = await ProviderRepository.addProvider(providerData);
        return new Provider(
            newProvider.ProviderID,
            newProvider.ProviderName,
            newProvider.ProviderAddress
        );
    }

    static async updateProvider(providerId, providerData) {
        const existingProvider =
            await ProviderRepository.getProviderById(providerId);
        if (!existingProvider) {
            throw new NotFoundError(`Provider not found`);
        }

        const updatedProvider = await ProviderRepository.updateProvider(
            providerId,
            providerData
        );
        return new Provider(
            updatedProvider.ProviderID,
            updatedProvider.ProviderName,
            updatedProvider.ProviderAddress
        );
    }

    static async deleteProvider(providerId) {
        const existingProvider =
            await ProviderRepository.getProviderById(providerId);
        if (!existingProvider) {
            throw new NotFoundError(`Provider not found`);
        }

        const deletedProvider =
            await ProviderRepository.deleteProvider(providerId);
        return new Provider(
            deletedProvider.ProviderID,
            deletedProvider.ProviderName,
            deletedProvider.ProviderAddress
        );
    }
}

module.exports = ProviderService;
