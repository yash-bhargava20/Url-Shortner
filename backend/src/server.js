const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes.js");
const urlRoutes = require("./routes/urlRoutes.js");
const redirectRoutes = require("./routes/redirectRoutes.js");
const { connectDB } = require("./config/db.js");
const { connectRedis } = require("./config/redis.js");
const { errorHandler } = require("./middleware/errorMiddleware.js");
const { limiter } = require("./middleware/rateLimiter.js");

dotenv.config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("ENV PATH =", process.cwd());

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:4173" }));
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/r", redirectRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "DevOps-Friendly URL Shortener API" });
});

app.use(errorHandler);

const startApp = async () => {
  await connectDB();
  await connectRedis();

  app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
  });
};

startApp();
