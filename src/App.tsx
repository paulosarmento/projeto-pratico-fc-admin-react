import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import { Layout } from "./components/Layout";
import { darkTheme, lightTheme } from "./config/theme";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/Router";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAppTheme } from "./hooks/useAppTheme";

function App() {
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box component="main">
          <Header
            theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
            toggle={toggleCurrentTheme}
          />
          <Layout
            children={<RouterProvider router={Router}></RouterProvider>}
          />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
