"use strict";

const { Connection, Request } = require("tedious");
const {
    db: { host, user, password, database },
} = require("../config/config.sqlserver");

// Thông tin kết nối cơ sở dữ liệu
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
        database: database,
        encrypt: true,
    },
};

const connection = new Connection(config);

connection.on("connect", function (err) {
    if (err) {
        console.error("Error connecting to SQL Server:", err.message);
    } else {
        console.log("Connected to SQL Server successfully");
    }
});

function executeQuery(query, callback) {
    const request = new Request(query, function (err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            callback(null, { rowCount: rowCount, rows: rows });
        }
    });

    connection.execSql(request);
}

process.on("exit", () => {
    connection.close();
});

module.exports = {
    executeQuery,
};
