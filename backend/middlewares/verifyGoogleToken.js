const { default: axios } = require("axios");

const verifyGoogleToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/tokeninfo",
      {
        params: { access_token: accessToken },
      }
    );

    if (data && !data.error) {
      req.userData = data;
      next();
    } else {
      return res.status(401).json({ error: "Invalid access token" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = verifyGoogleToken;
