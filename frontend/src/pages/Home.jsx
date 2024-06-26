import {
  Alert,
  Avatar,
  Box,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl, baseUrl } from "../api/paths";
import SearchWeather from "../components/SearchWeather";
import WeatherCard from "../components/WeatherCard";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { accessToken } = useParams();
  const [result, setResult] = useState("");
  const [location, setLocation] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const locationUrl = useLocation();
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  useEffect(() => {
    const params = new URLSearchParams(locationUrl.search);
    const accessToken = params.get("accessToken");
    if (!accessToken || undefined) {
      navigate("/login");
    }
    localStorage.setItem("accessToken", accessToken);
    const getUserData = async () => {
      try {
        const user = await axios.get(`${baseUrl.local}${apiUrl.googleUser}`, {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        });
        setUser(user.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const getWeather = async () => {
    if (location == "") {
      handleClickOpenErrorSnackbar();
    }
    if (!error && !location == "") {
      setDisabled(true);
      try {
        const response = await axios.get(
          `${baseUrl.local}${apiUrl.weather}/${location}`,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        setResult(response.data);
      } catch (error) {
        console.log(error);
        handleClickOpenErrorSnackbar();
        setDisabled(false);
      }
    }
  };

  const handleClickOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <></>
        <Avatar alt="Remy Sharp" src={user.picture} />
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography
          sx={{
            margin: "20px",
          }}
          variant="h5"
        >
          Exitech Weather App
        </Typography>
        {result ? (
          <WeatherCard
            result={result}
            setResult={setResult}
            setDisabled={setDisabled}
            setLocation={setLocation}
          />
        ) : (
          <SearchWeather
            setResult={setResult}
            setLocation={setLocation}
            getWeather={getWeather}
            disabled={disabled}
            setError={setError}
            error={error}
          />
        )}

        <Button
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
          variant="contained"
          onClick={async () => {
            try {
              await axios.post(
                `${baseUrl.local}${apiUrl.googleLogout}`,
                {},
                {
                  headers: {
                    authorization: localStorage.getItem("accessToken"),
                  },
                }
              );
              localStorage.clear();
              navigate("/login");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Logout
        </Button>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseErrorSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseErrorSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {location
              ? "Please enter a valid Location"
              : "Location is required"}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Home;
