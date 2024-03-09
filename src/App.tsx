import * as React from "react";
import { Box, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import { Layout } from "./components/Layout";
import { darkTheme } from "./config/theme";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/Router";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          component="main"
          sx={{
            minHeight: "100vh",
            background: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout
            children={<RouterProvider router={Router}></RouterProvider>}
          />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
