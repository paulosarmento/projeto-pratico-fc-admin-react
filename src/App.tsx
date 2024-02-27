import * as React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import Header from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box>
        <Typography variant="h3" component="h1">
          Home
        </Typography>
      </Box>
    ),
  },
  {
    path: "/about",
    element: (
      <Box>
        <Typography variant="h3" component="h1">
          About
        </Typography>
      </Box>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        component="main"
        sx={{ height: "100vh", background: (theme) => theme.palette.grey[900] }}
      >
        <Header />
        <Layout>
          <RouterProvider router={router}></RouterProvider>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
