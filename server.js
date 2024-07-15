require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.APP_PORT || 4000;
console.log("Port: " + process.env.PORT);

const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log("Exit Server Express!"));
});
