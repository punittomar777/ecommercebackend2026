const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

module.exports = router;