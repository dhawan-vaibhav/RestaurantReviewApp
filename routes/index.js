const express = require("express");
const router = express.Router();
const { ensureGuest, ensureAuth } = require("../middleware/auth");

router.get("", ensureGuest, (req, res) => {
  res.render("pages/login");
});
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("pages/dashboard");
});

module.exports = router;
