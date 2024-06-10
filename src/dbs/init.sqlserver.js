"use strict";

const Connection = require("tedious").Connection;
const {
    db: { host, user, password, port, database },
} = require("../config/config.sqlserver");

const config = {
    server: `${host}.database.windows.net`,
    authentication: {
        type: "default",
        options: {
            userName: user,
            password: password,
        },
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        // encrypt: true,
        database: database,
    },
};
var connection = new Connection(config);
connection.on("connect", function (err) {
    // If no error, then good to proceed.
    console.log("Connected to SQL Server Successfully");
});

connection.connect();
