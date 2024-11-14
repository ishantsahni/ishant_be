const express = require("express");
const Order = require("../../models/Order");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
