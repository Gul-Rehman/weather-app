import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl, baseUrl } from "../api/paths";

const Login = () => {
  const navigate = useNavigate();
  const backgroundImage =
    "https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148639325.jpg";
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const response = await axios.get(
          `${baseUrl.local}${apiUrl.googleToken}`
        );
        if (response.data.access_token) {
          localStorage.setItem("accessToken", response.data.access_token);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAccessToken();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Typography variant="h5" marginBottom={"20px"}>
        Exitech Weather App
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          window.location.replace("http://localhost:4000/auth/google");
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
