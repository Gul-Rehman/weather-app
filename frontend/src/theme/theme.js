import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // fontFamily: ["Noto Sans", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      mobilem: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
