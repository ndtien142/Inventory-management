const CustomerService = require("../services/customer.service");
const { SuccessResponse } = require("../core/success.response");
const { asyncHandler } = require("../helpers/asyncHandler");

class CustomerController {
    getAllCustomers = async (req, res) => {
        new SuccessResponse({
            message: "Get all customers success!",
            metadata: await CustomerService.getAllCustomers(),
        }).send(res);
    };

    getCustomerById = async (req, res) => {
        new SuccessResponse({
            message: "Get customer by ID success!",
            metadata: await CustomerService.getCustomerById(
                req.params.customerId
            ),
        }).send(res);
    };

    createCustomer = async (req, res) => {
        new SuccessResponse({
            message: "Create new customer success!",
            metadata: await CustomerService.createCustomer(req.body),
        }).send(res);
    };

    updateCustomer = async (req, res) => {
        new SuccessResponse({
            message: "Update customer success!",
            metadata: await CustomerService.updateCustomer(
                req.params.customerId,
                req.body
            ),
        }).send(res);
    };

    deleteCustomer = async (req, res) => {
        new SuccessResponse({
            message: "Delete customer success!",
            metadata: await CustomerService.deleteCustomer(
                req.params.customerId
            ),
        }).send(res);
    };
}

module.exports = new CustomerController();
