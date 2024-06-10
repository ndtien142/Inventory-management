"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// check api key
// router.use(apiKey);
// check permissions
// router.use(permission("0000"));

router.use("/customers", require("./customer"));
router.use("/locations", require("./location"));
router.use("/warehouses", require("./warehouse"));
router.use("/products", require("./product"));
router.use("", require("./access"));

module.exports = router;
