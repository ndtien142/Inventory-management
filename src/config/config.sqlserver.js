"use strict";

require("dotenv").config();

const dbConfig = {
    server: process.env.DB_SERVER,
    options: {
        port: parseInt(process.env.DB_PORT, 10),
        trustServerCertificate:
            process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
        database: process.env.DB_NAME,
    },
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
    },
};

module.exports = dbConfig;
