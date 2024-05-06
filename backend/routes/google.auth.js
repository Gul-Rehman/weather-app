const express = require("express");
const {
  googleLoginHandler,
  googleCallBackHandler,
  logout,
  getUserDataHandler,
} = require("../controllers/google.controller");
const verifyGoogleToken = require("../middlewares/verifyGoogleToken");
const router = express.Router();

router.get("/google", googleLoginHandler);
router.get("/google/callback", googleCallBackHandler);
router.post("/google/logout", logout);
router.get("/google/user", verifyGoogleToken, getUserDataHandler);

module.exports = router;
