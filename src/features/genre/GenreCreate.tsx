import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GenreForm } from "./components/GenreForm";
import { useSnackbar } from "notistack";
import {
  initialState,
  useCreateGenreMutation,
  useGetCategoriesQuery,
} from "./genreSlice";
import { Genre } from "../../types/Genres";

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCategoriesQuery({});

  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createGenre({
      name: genreState.name,
      categories_id: genreState.categories?.map((category) => category.id),
    });
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre created successfully", { variant: "success" });
    }
    if (status.error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Create Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={genreState}
          categories={categories?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
