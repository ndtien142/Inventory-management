const ROLE = Object.freeze({
    ADMIN: "admin",
    USER: "user",
    MANAGER: "manager",
    CUSTOMER: "customer",
});

const PRODUCT_STATUS = Object.freeze({
    1: "Available",
    2: "Out of stock",
});

const PAYMENT_TRANSACTION_STATUS = Object.freeze({
    SUCCESS: "success",
    FAILED: "failed",
});

const ORDER_STATUS = Object.freeze({
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
});

const PURCHASE_STATUS = Object.freeze({
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
});

module.exports = {
    ORDER_STATUS,
    PURCHASE_STATUS,
    PAYMENT_TRANSACTION_STATUS,
    PRODUCT_STATUS,
    ROLE,
};
