"use strict";

const tedious = require("tedious");
const { Sequelize } = require("sequelize");

const dbConfig = require("../config/config.sqlserver");

const db = {};

initialize();

async function initialize() {
    const dialect = "mssql";
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // create db if it doesn't already exist
    await ensureDbExists(dbConfig.options.database);

    // connect to db
    const sequelize = new Sequelize(
        dbConfig.options.database,
        userName,
        password,
        {
            host,
            dialect,
        }
    );

    // init models and add them to the exported db object
    db.PaymentMethod = require("../models/payment/paymentMethod.model")(
        sequelize
    );
    db.Brand = require("../models/product/brand.model")(sequelize);
    db.Provider = require("../models/purchase/provider.model")(sequelize);
    db.Role = require("../models/authentication/role.model")(sequelize);
    db.Account = require("../models/authentication/account.model")(sequelize);
    db.Unit = require("../models/product/unit.model")(sequelize);
    db.Account = require("../models/authentication/account.model")(sequelize);
    db.Cart = require("../models/order/cart.model")(sequelize);
    db.Category = require("../models/product/category.model")(sequelize);
    db.CustomerAddress = require("../models/user/customerAddress.model")(
        sequelize
    );
    db.Order = require("../models/order/order.model")(sequelize);
    db.Profile = require("../models/user/profile.model")(sequelize);
    db.Purchase = require("../models/purchase/purchase.model")(sequelize);
    db.DetailPurchaseActivity =
        require("../models/purchase/detailPurchaseActivity.model")(sequelize);
    db.PaymentTransactions =
        require("../models/payment/paymentTransaction.model")(sequelize);
    db.Product = require("../models/product/product.model")(sequelize);
    db.SKU = require("../models/product/sku.model")(sequelize);
    db.UnitConversion = require("../models/product/unitConversion.model")(
        sequelize
    );
    db.CartLineItem = require("../models/order/cartLineItem.model")(sequelize);
    db.DetailPurchase = require("../models/purchase/detailPurchase.model")(
        sequelize
    );
    db.OrderLineItem = require("../models/order/orderLineItem.model")(
        sequelize
    );

    // sync all models with database
    await sequelize.sync();
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });

            connection.execSql(request);
        });
    });
}

module.exports = db;
