const redisClient = require("../config/redis");

module.exports = async (req, res, next) => {
  const key = `rate:${req.ip}`;
  const limit = 100; // requests
  const window = 60; // seconds

  const current = await redisClient.incr(key);

  if (current === 1) {
    await redisClient.expire(key, window);
  }

  if (current > limit) {
    return res.status(429).json({
      message: "Too many requests"
    });
  }

  next();
};