const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  res.render("pages/review");
});

router.get("/create", ensureAuth, (req, res) => {
  res.render("review/create");
});

router.post("/create", ensureAuth, urlencodedParser, (req, res) => {
  console.log(req.body);
});

module.exports = router;
