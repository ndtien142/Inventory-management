const db = require("../../dbs/init.sqlserver");

class PaymentService {
    static getPaymentMethod = async () => {
        const paymentMethods = await db.PaymentMethod.findAll({
            where: { is_active: true },
        });
        return {
            id: paymentMethods.id,
            name: paymentMethods.name,
            description: paymentMethods.description,
            isActive: paymentMethods.is_active,
        };
    };
}

module.exports = PaymentService;
