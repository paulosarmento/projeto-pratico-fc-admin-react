import React, { useEffect, useState } from "react";
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateGenre({
      id: genreState.id,
      name: genreState.name,
      categories_id: genreState.categories?.map((category) => category.id),
    });
  }

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data);
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre updated successfully", { variant: "success" });
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
            <Typography variant="h5">Edit Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={genreState}
          categories={categories?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isDisabled={status.isLoading}
          isLoading={status.isLoading || isFetching}
        />
      </Paper>
    </Box>
  );
};
