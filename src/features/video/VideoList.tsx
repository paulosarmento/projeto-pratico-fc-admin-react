import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import VideosTable from "./components/VideosTable";
import { GridFilterModel } from "@mui/x-data-grid";
import { useGetVideosQuery } from "./videoSlice";

export const VideoList = () => {
  const [options, setOptions] = React.useState({
    page: 1,
    perPage: 10,
    search: "",
    rowsPerPage: [4, 10, 20, 30],
  });
  const { data, isFetching, error } = useGetVideosQuery(options);

  if (error) {
    return <Typography>Error fetching videos</Typography>;
  }

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
    console.log(id);

    // await deleteGenre({ id });
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/videos/create"
          style={{ marginBottom: "1rem" }}
        >
          New Video
        </Button>
      </Box>

      <VideosTable
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
