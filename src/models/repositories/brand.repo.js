const db = require("../../dbs/init.sqlserver");

const createNewBrand = async ({ brandName, brandDescription }) => {
    return await db.Brand.create({
        brand_name: brandName,
        brand_description: brandDescription,
        create_time: new Date(),
        update_time: new Date(),
    });
};
const getBrandById = async (id, option) => {
    return await db.Brand.findByPk(parseInt(id), option);
};
const getAllBrand = async () => {
    return await db.Brand.findAll();
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
