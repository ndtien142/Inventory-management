const ProviderService = require("../services/provider.service");
const { SuccessResponse } = require("../core/success.response");

class ProviderController {
    async getAllProviders(req, res) {
        const providers = await ProviderService.getAllProviders();
        new SuccessResponse({
            message: "Get all providers success!",
            metadata: providers,
        }).send(res);
    }

    async getProviderById(req, res) {
        const providerId = req.params.providerId;
        const provider = await ProviderService.getProviderById(providerId);
        new SuccessResponse({
            message: "Get provider by ID success!",
            metadata: provider,
        }).send(res);
    }

    async createProvider(req, res) {
        const providerData = req.body;
        const newProvider = await ProviderService.createProvider(providerData);
        new SuccessResponse({
            message: "Create new provider success!",
            metadata: newProvider,
        }).send(res);
    }

    async updateProvider(req, res) {
        const providerId = req.params.providerId;
        const providerData = req.body;
        const updatedProvider = await ProviderService.updateProvider(
            providerId,
            providerData
        );
        new SuccessResponse({
            message: "Update provider success!",
            metadata: updatedProvider,
        }).send(res);
    }

    async deleteProvider(req, res) {
        const providerId = req.params.providerId;
        const deletedProvider =
            await ProviderService.deleteProvider(providerId);
        new SuccessResponse({
            message: "Delete provider success!",
            metadata: deletedProvider,
        }).send(res);
    }
}

module.exports = new ProviderController();
