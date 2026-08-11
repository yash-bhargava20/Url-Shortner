const express = require("express");
const {
  getUrls,
  createUrl,
  deleteUrl,
  getAnalytics,
} = require("../controllers/urlController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(protect);
router.get("/", getUrls);
router.get("/analytics", getAnalytics);
router.post("/", createUrl);
router.delete("/:id", deleteUrl);

module.exports = router;
