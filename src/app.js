const express = require("express");
const requestLogger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/errorHandler");
// const rateLimiter = require("./middleware/rateLimit.middleware");

const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(requestLogger); // logger middleware

//middleware to parse json
app.use(express.json());
//auth routes
app.use("/api/auth", require("./routes/auth.routes"));
//payment routes
app.use("/api/payment", require("./routes/payment.routes"));
//custom logger middleware

app.use("/api/admin", require("./routes/admin.routes"));
//rate limiter middleware redis
// app.use(rateLimiter);
//product routes
app.use("/api/products", require("./routes/product.routes"));

//health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});

// Test Error Route
app.get("/error", (req, res) => {
  throw new Error("This is a testing error");
});

// Error handler MUST be last
app.use(errorHandler);

module.exports = app;
