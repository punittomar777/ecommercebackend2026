const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    time: new Date().toISOString()
  });

  next();
};

module.exports = requestLogger;