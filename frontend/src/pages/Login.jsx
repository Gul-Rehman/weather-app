import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

const Login = () => {
  const locationUrl = useLocation();
  const [error, setError] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const backgroundImage =
    "https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148639325.jpg";

  useEffect(() => {
    const params = new URLSearchParams(locationUrl.search);
    const errorMessage = params.get("errorMessage");
    if (errorMessage) {
      setError("Login Failed");
      handleClickOpenErrorSnackbar();
    }
  }, []);
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
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
