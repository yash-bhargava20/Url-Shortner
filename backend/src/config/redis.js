const { createClient } = require("redis");

let redisClient;

const connectRedis = async () => {
  try {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    redisClient = createClient({ url: redisUrl });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Redis connection failed:", error.message);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
