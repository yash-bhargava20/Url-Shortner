const Url = require("../models/Url.js");
const { getRedisClient } = require("../config/redis.js");
const { generateShortCode } = require("../utils/generateCode.js");
const { validateUrl } = require("../utils/urlValidator.js");
const QRCode = require("qrcode");

const CACHE_TTL = 3600;

const getUrls = async (req, res, next) => {
  try {
    const urls = await Url.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    const totalClicks = urls.reduce((sum, item) => sum + item.clicks, 0);
    const mostVisited = urls.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
    const recent = urls.slice(0, 5);

    res.json({ urls, analytics: { totalClicks, mostVisited, recent } });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const urls = await Url.find({ createdBy: req.user.id });
    const totalClicks = urls.reduce((sum, item) => sum + item.clicks, 0);
    const mostVisited = urls.sort((a, b) => b.clicks - a.clicks).slice(0, 3);
    const recent = urls.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
    res.json({ totalClicks, mostVisited, recent });
  } catch (error) {
    next(error);
  }
};

const createUrl = async (req, res, next) => {
  try {
    const { originalUrl, alias, expiresAt } = req.body;
    const absoluteUrl = originalUrl?.trim();

    if (!validateUrl(absoluteUrl)) {
      return res.status(400).json({ message: "Please provide a valid URL." });
    }

    const shortCode = alias?.trim() || generateShortCode();
    const existingShortCode = await Url.findOne({ shortCode });
    if (existingShortCode) {
      return res
        .status(409)
        .json({ message: "That alias or short code is already in use." });
    }

    const redirectHost = process.env.REDIRECT_URL || "http://localhost:5000";
    const shortLink = `${redirectHost}/r/${shortCode}`;
    const qrCode = await QRCode.toDataURL(shortLink);

    const record = await Url.create({
      originalUrl: absoluteUrl,
      shortCode,
      alias: alias?.trim() || "",
      createdBy: req.user.id,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      qrCode,
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

const deleteUrl = async (req, res, next) => {
  try {
    const url = await Url.findById(req.params.id);
    if (!url) {
      return res.status(404).json({ message: "URL not found." });
    }
    if (url.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action." });
    }

    await url.remove();
    res.json({ message: "Short link deleted." });
  } catch (error) {
    next(error);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const redisClient = getRedisClient();
    const cacheKey = `shortcode:${code}`;
    let urlData = null;

    if (redisClient) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        urlData = JSON.parse(cached);
      }
    }

    if (!urlData) {
      urlData = await Url.findOne({ shortCode: code });
      if (!urlData) {
        return res.status(404).json({ message: "Link not found." });
      }
      if (urlData.expiresAt && urlData.expiresAt < new Date()) {
        return res.status(410).json({ message: "Link has expired." });
      }
      if (redisClient) {
        await redisClient.set(
          cacheKey,
          JSON.stringify({
            originalUrl: urlData.originalUrl,
            shortCode: urlData.shortCode,
          }),
          {
            EX: CACHE_TTL,
          },
        );
      }
    }

    await Url.findOneAndUpdate(
      { shortCode: code },
      { $inc: { clicks: 1 } },
      { new: true },
    );
    return res.redirect(urlData.originalUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUrls,
  createUrl,
  deleteUrl,
  getAnalytics,
  redirectUrl,
};
