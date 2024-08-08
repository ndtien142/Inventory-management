const db = require("../../dbs/init.sqlserver");

class PaymentService {
    static getPaymentMethod = async () => {
        const paymentMethods = await db.PaymentMethod.findAll({
            where: { is_active: true },
        });
        return paymentMethods.map((item) => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                isActive: item.is_active,
            };
        });
    };
}

module.exports = PaymentService;
