import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Fab, Paper, Typography } from "@mui/material";
import React from "react";

const WeatherCard = ({ result, setResult, setDisabled, setLocation }) => {
  let image =
    "https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-white-cloud-on-blue-sky-weather-background-image_410050.jpg";

  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        width: { xs: "200px", mobilem: "350px", sm: "600px" },
        height: "600px",
        borderRadius: "10px",
        position: "relative",
      }}
      component={Paper}
      elevation={4}
    >
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          position: "absolute",
          top: "1px",
          width: "100%",
          height: "400px",
          opacity: "0.2",
          backgroundSize: "cover",
        }}
      ></Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: "20px",
          left: { xs: "20px", mobilem: "30px" },
        }}
        size="small"
        onClick={() => {
          setResult("");
          setDisabled(false);
          setLocation("");
        }}
      >
        <ChevronLeftIcon />
      </Fab>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: " translate(-50%, -50%)",
        }}
      >
        <Typography variant="h5">
          {result?.location?.name}, {result?.location?.country}
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
        >
          <Typography variant="h5">
            {result?.current?.condition?.text}
          </Typography>
          <Box
            component={"img"}
            width={"100px"}
            src={result?.current?.condition?.icon}
            alt="weather condition icon"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
        >
          <Typography variant="h5">{result?.current?.humidity}</Typography>
          <Box
            component={"img"}
            width="36"
            height="36"
            src="https://img.icons8.com/ios/36/moisture.png"
            alt="moisture"
          />

          <Typography variant="body2">Humidity</Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
        >
          <Typography variant="h5">{result?.current?.wind_mph}</Typography>
          <Typography variant="body">(mph)</Typography>
          <Box
            component={"img"}
            width="36"
            height="36"
            src="https://img.icons8.com/ios/50/wind--v1.png"
            alt="moisture"
          />

          <Typography variant="body2">Wind</Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
        >
          <Typography variant="h5">{result?.current?.wind_kph} </Typography>
          <Typography variant="body">(kph)</Typography>
          <Box
            component={"img"}
            width="36"
            height="36"
            src="https://img.icons8.com/ios/50/wind--v1.png"
            alt="moisture"
          />

          <Typography variant="body2">Wind</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Temperature</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" sx={{ marginRight: "5px" }}>
              {result?.current?.temp_c} °C
            </Typography>

            <Typography variant="h6"> | </Typography>

            <Typography variant="h6" sx={{ marginLeft: "5px" }}>
              {result?.current?.temp_f} °F
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherCard;
