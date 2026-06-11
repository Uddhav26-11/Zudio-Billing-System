const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts
} = require("../controllers/productController");

router.post(
  "/",
  authMiddleware,
  createProduct
);

router.get(
  "/",
  getProducts
);

module.exports = router;