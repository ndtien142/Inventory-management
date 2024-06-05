require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Origin",
            "X-Requested-With",
            "Accept",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Methods",
            "Access-Control-Request-Headers",
            "Access-Control-Request-Method",
            "X-Client-Id",
        ],
    })
);

// init db
require("./dbs/init.mongodb");

// router
// app.get("/", (req, res, next) => {
//     return res.status(200).json({
//         message: "Welcome to my backend app eCommerce!",
//     });
// });

// init routers
app.use("", require("./routers"));

// handling error
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message,
    });
});

module.exports = app;
