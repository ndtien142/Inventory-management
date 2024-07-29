const db = require("../../dbs/init.sqlserver");

const createNewBrand = async ({ name, description }) => {
    return await db.Brand.create({
        brand_name: name,
        brand_description: description,
    });
};
const getBrandById = async (id, option) => {
    return await db.Brand.findByPk(parseInt(id), option);
};
const getAllBrand = async ({ offset = 0, limit = 20 }) => {
    return await db.Brand.findAndCountAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [["brand_name", "ASC"]],
    });
};
const updateBrand = async (id, { brandName, brandDescription }) => {
    const brand = getBrandById(id);
    return await db.Brand.update(
        {
            brand_name: brandName || brand.brand_name,
            brand_description: brandDescription || brand.brand_description,
            update_time: new Date(),
        },
        { where: { id: id } }
    );
};
const deleteBrand = async (id) => {
    return await db.Brand.destroy({ where: { id: id } });
};
const getBrandByName = async (brandName) => {
    return db.Brand.findOne({ where: { brand_name: brandName } });
};

module.exports = {
    createNewBrand,
    getBrandById,
    getAllBrand,
    updateBrand,
    deleteBrand,
    getBrandByName,
};
