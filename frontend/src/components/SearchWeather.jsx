import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
const SearchWeather = ({
  setResult,
  setLocation,
  location,
  getWeather,
  disabled,
  error,
  setError,
}) => {
  let image =
    "https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-white-cloud-on-blue-sky-weather-background-image_410050.jpg";

  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        width: "600px",
        height: "400px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
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
      <img
        width="120"
        height="120"
        src="https://img.icons8.com/color-glass/120/partly-cloudy-day--v1.png"
        alt="partly-cloudy-day--v1"
      />
      <Typography sx={{ margin: "5px 0px" }}>
        Please Enter the location and get your weather updates now
      </Typography>

      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        error={error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          const value = event.target.value;

          setLocation(event.target.value);
          if (!value.trim()) {
            setError("This field is required");
          } else if (!/^[A-Za-z]+$/.test(value)) {
            setError("Only letters are allowed");
          } else {
            setError("");
          }
        }}
      />

      <Button
        variant="contained"
        sx={{ marginLeft: "5px" }}
        disabled={disabled}
        onClick={() => {
          if (!error && location !== "") {
            getWeather();
          }
        }}
      >
        Search
        <ChevronRightIcon />
      </Button>
      <Typography>{location}</Typography>
    </Box>
  );
};

export default SearchWeather;
