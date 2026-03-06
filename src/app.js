const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimit.middleware");

const app = express();

//middleware toparse json
app.use(express.json());
app.use("/api/payment", require("./routes/payment.routes"));
//custom logger middleware
app.use(logger);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use(rateLimiter);

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
