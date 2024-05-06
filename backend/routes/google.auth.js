const express = require("express");
const {
  googleLoginHandler,
  googleCallBackHandler,
  logout,
  getAccessTokenHandler,
} = require("../controllers/google.controller");
const router = express.Router();

router.get("/google", googleLoginHandler);
router.get("/google/callback", googleCallBackHandler);
router.post("/google/logout", logout);
router.get("/google/token", getAccessTokenHandler);

module.exports = router;
