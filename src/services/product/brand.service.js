const {
    getBrandById,
    getAllBrand,
    getBrandByName,
    createNewBrand,
} = require(".././../models/repositories/brand.repo");
const { BadRequestError, NotFoundError } = require("../../core/error.response");

const { createBrandSchema } = require("./brand.schema");

class BrandService {
    static getBrandById = async (brandId) => {
        const brand = await getBrandById(brandId);
        if (!brand) {
            throw new NotFoundError("Brand not found");
        }
        return {
            id: brand.id,
            name: brad.brand_name,
            description: brand.brand_description,
        };
    };

    static getAllBrand = async ({ page = 1, limit = 20 }) => {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const brands = await getAllBrand({ offset, limit });
        return (
            brands &&
            brands.map((brand) => {
                return {
                    id: brand.id,
                    name: brand.brand_name,
                    description: brand.brand_description,
                };
            })
        );
    };

    static updateBrand = async (brandId, { name, description }) => {
        const brand = await getBrandById(brandId);
        if (!brand) {
            throw new NotFoundError("Brand not found");
        }
        await brand.update({
            brand_name: name || brand.brand_name,
            brand_description: description || brand.brand_description,
        });
        return {
            id: brand.id,
            name: brand.brand_name,
            description: brand.brand_description,
        };
    };

    static createBrand = async ({ name, description }) => {
        const { error, value } = createBrandSchema().validate({
            name,
            description,
        });

        if (error) {
            throw new BadRequestError(
                error.details.map((d) => d.message).join(", ")
            );
        }

        const foundBrand = await getBrandByName(name);
        if (foundBrand) {
            throw new BadRequestError("Brand already exists");
        }

        const brand = await createNewBrand({ name, description });

        return {
            id: brand.id,
            name: brand.brand_name,
            description: brand.brand_description,
        };
    };

    static deleteBrand = async (brandId) => {
        const brand = await getBrandById(brandId);
        if (!brand) {
            throw new NotFoundError("Brand not found");
        }
        await brand.destroy();

        return {
            id: brand.id,
            name: brand.brand_name,
            description: brand.brand_description,
        };
    };
}

module.exports = BrandService;
