"use strict";

const Connection = require("tedious").Connection;
const {
    db: { host, user, password, port, database },
} = require("../config/config.sqlserver");

const config = {
    server: `${host}`,
    authentication: {
        type: "default",
        options: {
            userName: user,
            password: password,
        },
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        database: database,
        encrypt: true,
        trustServerCertificate: true, // Trust the self-signed certificate
        connectTimeout: 15000,
        requestTimeout: 15000,
        port: 1433,
    },
};

const connection = new Connection(config);
connection.on("connect", function (err) {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("Connected to SQL Server Successfully");
    }
});

connection.connect();
