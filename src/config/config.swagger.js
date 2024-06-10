const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Inventory Management",
            version: "1.0.0",
            description:
                "API documentation for Inventory Management application",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routers/*.js", "./src/routers/**/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
