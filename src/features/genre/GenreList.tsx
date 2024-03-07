import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GenreTable from "./components/GenreTable";
import { useSnackbar } from "notistack";
import { useDeleteGenreMutation, useGetGenresQuery } from "./genreSlice";
import { GridFilterModel } from "@mui/x-data-grid";

export const GenreList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = React.useState({
    page: 1,
    perPage: 10,
    search: "",
    rowsPerPage: [4, 10, 20, 30],
  });
  const { data, isFetching, error } = useGetGenresQuery(options);
  const [deleteGenre, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteGenreMutation();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }
  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterMode: GridFilterModel) {
    if (filterMode.quickFilterValues?.length) {
      const search = filterMode.quickFilterValues.join("");
      setOptions({ ...options, search });
    }
    return setOptions({ ...options, search: "" });
  }

  async function handleDeleteGenre(id: string) {
    await deleteGenre({ id });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Genre deleted`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Genre not deleted`, { variant: "error" });
    }
  }, [deleteError, deleteSuccess, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching genres</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/genres/create"
          style={{ marginBottom: "1rem" }}
        >
          New Genre
        </Button>
      </Box>

      <GenreTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteGenre}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
