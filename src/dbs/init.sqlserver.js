const tedious = require("tedious");
const { Sequelize } = require("sequelize");

const dbConfig = require("../config/config.sqlserver");

module.exports = db = {};

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
    db.ApiKeys = require("../models/authentication/apikey.model")(sequelize);
    db.KeyToken = require("../models/authentication/keytoken.model")(sequelize);
    db.RefreshTokenUsed =
        require("../models/authentication/refreshTokenUsed.model")(sequelize);

    // create associations
    // One - One
    db.Account.belongsTo(db.Role, { foreignKey: "fk_role_id", as: "role" });
    db.Cart.belongsTo(db.Account, { foreignKey: "fk_user_code", as: "user" });
    db.KeyToken.belongsTo(db.Account, { foreignKey: "fk_user_code" });
    db.Order.belongsTo(db.PaymentMethod, {
        foreignKey: "fk_payment_method_id",
        as: "paymentMethod",
    });
    db.PaymentTransactions.belongsTo(db.PaymentMethod, {
        foreignKey: "fk_payment_method_id",
        as: "paymentMethod",
    });
    db.Order.belongsTo(db.Account, { foreignKey: "fk_user_code", as: "user" });
    db.PaymentTransactions.belongsTo(db.Order, {
        foreignKey: "fk_order_id",
        as: "order",
    });
    db.Order.belongsTo(db.CustomerAddress, {
        foreignKey: "fk_address_id",
        as: "address",
    });
    db.Category.belongsTo(db.Category, {
        foreignKey: "parent_category_id",
        as: "parentCategory",
    });
    db.Product.belongsTo(db.Brand, {
        foreignKey: "product_brand_id",
        as: "brand",
    });
    db.Product.belongsTo(db.Category, {
        foreignKey: "product_category_id",
        as: "category",
    });
    db.SKU.belongsTo(db.Unit, { foreignKey: "fk_unit_id", as: "unit" });
    db.UnitConversion.belongsTo(db.Unit, {
        foreignKey: "base_unit_id",
        as: "baseUnit",
    });
    db.UnitConversion.belongsTo(db.Unit, {
        foreignKey: "conversion_unit_id",
        as: "conversionUnit",
    });
    db.Profile.belongsTo(db.Account, {
        foreignKey: "fk_user_code",
    });
    db.Purchase.belongsTo(db.Provider, {
        foreignKey: "fk_provider_id",
        as: "provider",
    });

    // ========= One - Many =========
    // KeyToken - RefreshTokenUsed
    db.KeyToken.hasMany(db.RefreshTokenUsed, { foreignKey: "fk_api_key_id" });
    db.RefreshTokenUsed.belongsTo(db.KeyToken, { foreignKey: "fk_api_key_id" });

    // Account - Address
    db.Account.hasMany(db.CustomerAddress, {
        foreignKey: "fk_user_code",
    });
    db.CustomerAddress.belongsTo(db.Account, {
        foreignKey: "fk_user_code",
    });

    // Product - SKU
    db.Product.hasMany(db.SKU, { foreignKey: "fk_product_id" });
    db.SKU.belongsTo(db.Product, {
        foreignKey: "fk_product_id",
        as: "product",
    });

    // Product - UnitConversion
    db.Product.hasMany(db.UnitConversion, { foreignKey: "fk_product_id" });
    db.UnitConversion.belongsTo(db.Product, {
        foreignKey: "fk_product_id",
        as: "product",
    });

    // ======== Many - Many ==========
    // Purchase - DetailPurchase - SKU
    db.Purchase.belongsToMany(db.SKU, {
        through: db.DetailPurchase,
        foreignKey: "fk_purchase_id",
    });
    db.SKU.belongsToMany(db.Purchase, {
        through: db.DetailPurchase,
        foreignKey: "fk_sku_no",
    });
    // Purchase - DetailPurchaseActivity - Account
    db.Purchase.belongsToMany(db.Account, {
        through: db.DetailPurchaseActivity,
        foreignKey: "fk_purchase_id",
    });
    db.Account.belongsToMany(db.Purchase, {
        through: db.DetailPurchaseActivity,
        foreignKey: "fk_admin_id",
    });

    // Cart - CartLineItem - SKU
    db.Cart.belongsToMany(db.SKU, {
        through: db.CartLineItem,
        foreignKey: "fk_cart_id",
    });
    db.SKU.belongsToMany(db.Cart, {
        through: db.CartLineItem,
        foreignKey: "fk_sku_no",
    });

    // Order - OrderLineItem - SKU
    db.Order.belongsToMany(db.SKU, {
        through: db.OrderLineItem,
        foreignKey: "fk_order_id",
    });
    db.SKU.belongsToMany(db.Order, {
        through: db.OrderLineItem,
        foreignKey: "fk_sku_no",
    });
    // sync all models with database
    await sequelize.sync({ alter: true });
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
