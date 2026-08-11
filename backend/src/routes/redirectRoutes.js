const express = require("express");
const { redirectUrl } = require("../controllers/urlController.js");

const router = express.Router();

router.get("/:code", redirectUrl);

module.exports = router;
