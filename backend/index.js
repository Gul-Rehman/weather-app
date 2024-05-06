const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/google.auth");
const PORT = process.env.PORT || 4000;
const { default: axios } = require("axios");
const verifyGoogleToken = require("./middlewares/verifyGoogleToken.js");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/weather/:location", verifyGoogleToken, async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${req.params.location}&aqi=no`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
