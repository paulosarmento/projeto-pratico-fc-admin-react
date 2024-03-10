import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import { Layout } from "./components/Layout";
import { darkTheme, lightTheme } from "./config/theme";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/Router";
import { SnackbarProvider } from "notistack";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const toggle = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box component="main">
          <Header toggle={toggle} />
          <Layout
            children={<RouterProvider router={Router}></RouterProvider>}
          />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
