const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBill,
  getBills
} = require("../controllers/billController");

router.post(
  "/",
  authMiddleware,
  createBill
);

router.get(
  "/",
  authMiddleware,
  getBills
);

module.exports = router;