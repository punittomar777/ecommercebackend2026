const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.get("/dashboard", auth, authorize("admin"), (req, res)=>{
    res.json({message:"Welcome to the admin dashboard"});
})

module.exports = router;