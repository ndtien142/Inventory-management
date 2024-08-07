"use strict";

const { NotFoundError, BadRequestError } = require("../../core/error.response");
const db = require("../../dbs/init.sqlserver");

class AddressService {
    static async createAddress({
        userCode,
        addressLine1,
        addressLine2,
        city,
        stateProvince,
        postalCode,
        country,
        isDefault,
        phoneNumber,
    }) {
        const addressCount = await db.CustomerAddress.count({
            where: {
                fk_user_code: userCode,
                is_deleted: false,
            },
        });

        if (addressCount >= 5) {
            throw new BadRequestError("Bạn đã đạt giới hạn tối đa 5 địa chỉ.");
        }

        if (isDefault) {
            await db.CustomerAddress.update(
                { is_default: false },
                { where: { fk_user_code: userCode, is_deleted: false } }
            );
        }

        const newAddress = await db.CustomerAddress.create({
            fk_user_code: userCode,
            address_line1: addressLine1,
            address_line2: addressLine2,
            city,
            state_province: stateProvince,
            postal_code: postalCode,
            country,
            is_default: isDefault,
            phone_number: phoneNumber,
            is_deleted: false,
        });
        return {
            addressLine1: newAddress.address_line1,
            addressLine2: newAddress.address_line2,
            city: newAddress.city,
            stateProvince: newAddress.state_province,
            postalCode: newAddress.postal_code,
            country: newAddress.country,
            phoneNumber: newAddress.phone_number,
            isDefault: newAddress.is_default,
        };
    }

    static async getAddressById(id) {
        const address = await db.CustomerAddress.findByPk(id);
        if (!address || address.is_deleted) {
            throw new NotFoundError("Address not found");
        }
        return {
            id: address.id,
            addressLine1: address.address_line1,
            addressLine2: address.address_line2,
            city: address.city,
            stateProvince: address.state_province,
            postalCode: address.postal_code,
            country: address.country,
            phoneNumber: address.phone_number,
            isDefault: address.is_default,
        };
    }

    static async getAddressesByUserCode(userCode) {
        const addresses = await db.CustomerAddress.findAll({
            where: {
                fk_user_code: userCode,
                is_deleted: false,
            },
            order: [["is_default", "DESC"]],
        });
        return addresses.map((address) => {
            return {
                id: address.id,
                addressLine1: address.address_line1,
                addressLine2: address.address_line2,
                city: address.city,
                stateProvince: address.state_province,
                postalCode: address.postal_code,
                country: address.country,
                phoneNumber: address.phone_number,
                isDefault: address.is_default,
            };
        });
    }

    static async updateAddress(
        id,
        {
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            phoneNumber,
            country = "Việt Nam",
            isDefault = false,
        }
    ) {
        const address = await db.CustomerAddress.findByPk(id);
        if (!address || address.is_deleted) {
            throw new NotFoundError("Address not found");
        }
        if (isDefault) {
            await db.CustomerAddress.update(
                { is_default: false },
                { where: { fk_user_code: userCode, is_deleted: false } }
            );
        }
        await address.update({
            address_line1: addressLine1 || address.address_line1,
            address_line2: addressLine2 || address.address_line2,
            city: city || address.city,
            state_province: state || address.state_province,
            postal_code: postalCode || address.postal_code,
            country: country || address.country,
            phone_number: phoneNumber || address.phone_number,
            update_time: new Date(),
        });

        return {
            addressLine1: address.address_line1,
            addressLine2: address.address_line2,
            city: address.city,
            stateProvince: address.state_province,
            postalCode: address.postal_code,
            country: address.country,
            phoneNumber: address.phone_number,
            isDefault: address.is_default,
        };
    }

    static async deleteAddress(id) {
        const address = await db.CustomerAddress.findByPk(id);
        console.log(address);
        if (!address || address.is_deleted) {
            throw new NotFoundError("Address not found");
        }
        await address.update({ is_deleted: true });
        return {
            id: address.id,
            addressLine1: address.address_line1,
            addressLine2: address.address_line2,
            city: address.city,
            stateProvince: address.state_province,
            postalCode: address.postal_code,
            country: address.country,
            phoneNumber: address.phone_number,
            isDefault: address.is_default,
        };
    }
}

module.exports = AddressService;
