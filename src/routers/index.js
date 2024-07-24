"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// check api key
router.use(apiKey);
// check permissions

router.use(permission("0000"));

router.use("/account", require("./access"));

router.use("/brand", require("./brand"));
router.use("/category", require("./category"));

router.use("/admin/role", require("./role"));
router.use("/admin/product", require("./product"));
router.use("/admin/purchase", require("./purchase"));

module.exports = router;
