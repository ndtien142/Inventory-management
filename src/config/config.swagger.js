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
        servers: [
            {
                url: `http://localhost:3055/v1/api`,
                description: "Local development server",
            },
        ],
    },
    apis: [
        "./src/routers/*.js",
        "./src/routers/**/*.js",
        "./src/docs/swagger/*.js",
    ],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
