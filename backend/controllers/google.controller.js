const { google } = require("googleapis");
const { default: axios } = require("axios");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:4000/auth/google/callback"
);
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

const getUserDataHandler = async (req, res, next) => {
  try {
    const data = req.userData;
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

const googleLoginHandler = async (req, res, next) => {
  try {
    res.redirect(authorizationUrl);
  } catch (err) {
    next(err);
  }
};

const auth = () => {
  try {
    const accessToken = oauth2Client.credentials.access_token;
    return accessToken;
  } catch (err) {
    next(err);
  }
};
const googleCallBackHandler = async (req, res, next) => {
  try {
    const { code, error } = req.query;
    if (error == "access_denied") {
      return res.redirect("http://localhost:3000/login?errorMessage=1");
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    const { data } = await oauth2.userinfo.get();
    if (!data) {
      return res.redirect("http://localhost:3000/login?errorMessage=1");
    }
    const accessToken = auth();
    res.redirect(`http://localhost:3000?accessToken=${accessToken}`);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(400).json({ error: "Access token is missing" });
    }

    await axios.post("https://accounts.google.com/o/oauth2/revoke", null, {
      params: {
        token: accessToken,
      },
    });

    oauth2Client.setCredentials(null);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  googleLoginHandler,
  googleCallBackHandler,
  logout,
  getUserDataHandler,
};
