import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { GenreForm } from "./components/GenreForm";

export const GenreCreate = () => {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Create Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={{}}
          categories={{}}
          handleSubmit={() => {}}
          handleChange={() => {}}
          isDisabled={false}
          isLoading={false}
        />
      </Paper>
    </Box>
  );
};
