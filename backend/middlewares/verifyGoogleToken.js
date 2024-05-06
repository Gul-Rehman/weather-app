const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

const verifyGoogleToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const ticket = await client.getTokenInfo(accessToken);
    if (ticket && !ticket.error) {
      client.setCredentials({ access_token: accessToken });

      const { data } = await client.request({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        method: "GET",
      });

      req.userData = data;
      next();
    } else {
      return res.status(401).json({ error: "Invalid access token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = verifyGoogleToken;
