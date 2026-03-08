const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin
router.post("/", auth, authorize("admin","user"), createProduct);
router.put("/:id", auth, authorize("admin","user"), updateProduct);
router.delete("/:id", auth, authorize("admin","user"), deleteProduct);

module.exports = router;
