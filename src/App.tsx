import { Box, ThemeProvider, createTheme } from "@mui/material";
import * as React from "react";
import Header from "./components/Header";
import { Layout } from "./components/Layout";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ height: "100vh", background: "red" }}>
        <Header />
        <Layout>
          <h1>Hello</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
