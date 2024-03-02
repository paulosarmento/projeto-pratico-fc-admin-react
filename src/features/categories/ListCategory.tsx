import { Box, Button, Link, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoryTable";

const CategoryList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [search, setSearch] = useState("");
  const [rowsPerPage] = useState([4, 10, 15, 444]);

  const options = {
    perPage,
    search,
    page,
  };

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  console.log(data);

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }
  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage);
  }

  function handleFilterChange(filterMode: GridFilterModel) {
    if (filterMode.quickFilterValues?.length) {
      const search = filterMode.quickFilterValues.join("");
      setSearch(search);
    }
    return setSearch("");
  }
  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }

    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Error deleting category", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth={"lg"} sx={{ mt: 4, mb: 4 }}>
      <Box display={"flex"} justifyContent="flex-end">
        <Button
          color="secondary"
          component={Link}
          href="/categories/create"
          style={{ marginBottom: "1rem" }}
          variant="contained"
        >
          New Category
        </Button>
      </Box>
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
export default CategoryList;
