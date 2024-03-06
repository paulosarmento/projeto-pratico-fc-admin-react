import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import {
  initialState,
  useGetCategoriesQuery,
  useGetGenreQuery,
  useUpdateGenreMutation,
} from "./genreSlice";
import { Genre } from "../../types/Genres";
import { Box, Paper, Typography } from "@mui/material";
import { GenreForm } from "./components/GenreForm";

export const GenreEdit = () => {
  const id = useParams<{ id: string }>().id as string;
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCategoriesQuery({});
  const [updateGenre, status] = useUpdateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Create Genre</Typography>
          </Box>
        </Box>
        {/* <GenreForm
          genre={genreState}
          categories={categories?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        /> */}
      </Paper>
    </Box>
  );
};
