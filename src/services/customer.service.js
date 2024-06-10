const Joi = require("joi");
const CustomerRepository = require("../repositories/user.repo");
const Customer = require("../models/customer.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class CustomerService {
    static async getAllCustomers() {
        const customers = await CustomerRepository.getAllCustomers();
        if (customers.length === 0) {
            throw new NotFoundError("No customers found");
        }
        const listCustomer = customers.map(
            (customer) =>
                new Customer(
                    customer.CustomerID,
                    customer.CustomerName,
                    customer.CustomerAddress
                )
        );
        return listCustomer;
    }

    static async getCustomerById(customerId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(customerId);
        if (error) {
            throw new BadRequestError(`Invalid customerId: ${error.message}`);
        }

        const customer = await CustomerRepository.getCustomerById(customerId);
        if (!customer) {
            throw new NotFoundError(`Customer with ID ${customerId} not found`);
        }
        return new Customer(
            customer.CustomerID,
            customer.CustomerName,
            customer.CustomerAddress
        );
    }

    static async createCustomer(customerData) {
        const schema = Joi.object({
            customerName: Joi.string().required(),
            customerAddress: Joi.string().required(),
        });

        const { error } = schema.validate(customerData);
        if (error) {
            throw new BadRequestError(
                `Invalid customer data: ${error.message}`
            );
        }

        const foundCustomer = await CustomerRepository.getCustomerByName(
            customerData.CustomerName
        );
        if (foundCustomer) {
            throw new BadRequestError(
                `Customer with name ${customerData.CustomerName} already exists`
            );
        }

        const newCustomer = await CustomerRepository.addCustomer(customerData);
        return new Customer(
            newCustomer.CustomerID,
            newCustomer.CustomerName,
            newCustomer.CustomerAddress
        );
    }

    static async updateCustomer(customerId, customerData) {
        const customerIdSchema = Joi.number().integer().min(1).required();
        const schema = Joi.object({
            customerName: Joi.string(),
            customerAddress: Joi.string(),
        }).min(1);

        const { error: customerIdError } =
            customerIdSchema.validate(customerId);
        if (customerIdError) {
            throw new BadRequestError(
                `Invalid customerId: ${customerIdError.message}`
            );
        }

        const { error: customerDataError } = schema.validate(customerData);
        if (customerDataError) {
            throw new BadRequestError(
                `Invalid customer data: ${customerDataError.message}`
            );
        }

        const updatedCustomer = await CustomerRepository.updateCustomer(
            customerId,
            customerData
        );
        if (!updatedCustomer) {
            throw new NotFoundError(`Customer with ID ${customerId} not found`);
        }
        return new Customer(
            updatedCustomer.CustomerID,
            updatedCustomer.CustomerName,
            updatedCustomer.CustomerAddress
        );
    }

    static async deleteCustomer(customerId) {
        const schema = Joi.number().integer().min(1).required();

        const { error } = schema.validate(customerId);
        if (error) {
            throw new BadRequestError(`Invalid customerId: ${error.message}`);
        }

        const deletedCustomer =
            await CustomerRepository.deleteCustomer(customerId);
        if (!deletedCustomer) {
            throw new NotFoundError(`Customer with ID ${customerId} not found`);
        }
        return new Customer(
            deletedCustomer.CustomerID,
            deletedCustomer.CustomerName,
            deletedCustomer.CustomerAddress
        );
    }
}

module.exports = CustomerService;
