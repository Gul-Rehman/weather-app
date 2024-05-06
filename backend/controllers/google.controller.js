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

const getAccessTokenHandler = async (req, res, next) => {
  try {
    // Get the access token from the OAuth2 client
    const accessToken = oauth2Client.credentials.access_token;

    // Return the access token in the response
    res.status(200).json({ access_token: accessToken });
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

const googleCallBackHandler = async (req, res, next) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log("tokens : ", tokens);
    res.redirect(`http://localhost:3000/`);
    // res.json({ tokens });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  try {
    const accessToken = req.headers.authorization; // Assuming the access token is stored on the client side
    if (!accessToken) {
      // If access token is not available, return an error response
      return res.status(400).json({ error: "Access token is missing" });
    }

    // Revoke the access token by making a request to Google's token revocation endpoint
    await axios.post("https://accounts.google.com/o/oauth2/revoke", null, {
      params: {
        token: accessToken,
      },
    });

    // Clear any session or token stored on the client side
    // For example, clear cookies, localStorage, or sessionStorage
    oauth2Client.setCredentials(null);

    // Return a success response indicating logout was successful
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // If an error occurs during logout, return an error response
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  googleLoginHandler,
  googleCallBackHandler,
  logout,
  getAccessTokenHandler,
};
