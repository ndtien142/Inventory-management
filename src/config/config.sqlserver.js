"use strict";

const dev = {
    db: {
        host: process.env.DEV_DB_SERVER_NAME || `DESKTOP-LDUQE6I`,
        user: process.env.DEV_DB_USER || "sa",
        password: process.env.DEV_DB_PASSWORD || "123",
        port: process.env.DEV_DB_PORT || 1433,
        database: process.env.DEV_DB_DATABASE || "InventoryManagement",
    },
};

const pro = {
    db: {
        host: process.env.PRO_DB_SERVER_NAME || `DESKTOP-LDUQE6I`,
        user: process.env.PRO_DB_USER || "sa",
        password: process.env.PRO_DB_PASSWORD || "123",
        port: process.env.PRO_DB_PORT || 1433,
        database: process.env.PRO_DB_DATABASE || "InventoryManagement",
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
