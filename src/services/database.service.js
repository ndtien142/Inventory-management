"use strict";

const { Connection, Request, TYPES } = require("tedious");
const {
    db: { host, user, password, database },
} = require("../config/config.sqlserver");

const config = {
    server: host,
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
        trustServerCertificate: true,
        connectTimeout: 15000,
        requestTimeout: 15000,
        port: 1433,
        rowCollectionOnRequestCompletion: true,
    },
};

function createConnection() {
    return new Connection(config);
}

function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        const connection = createConnection();

        connection.on("connect", (err) => {
            if (err) {
                reject(err);
                return;
            }

            const request = new Request(query, function (err, rowCount, rows) {
                if (err) {
                    reject(err);
                } else {
                    const results = [];
                    rows.forEach((row) => {
                        const result = {};
                        row.forEach((column) => {
                            result[column.metadata.colName] = column.value;
                        });
                        results.push(result);
                    });
                    resolve(results);
                }
            });

            // Add parameters to the request if any
            params.forEach((param) => {
                request.addParameter(param.name, param.type, param.value);
            });

            connection.execSql(request);
        });

        connection.connect();
    });
}

module.exports = {
    executeQuery,
    TYPES,
};
