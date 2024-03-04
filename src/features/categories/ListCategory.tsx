import { Box, Button, Link, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoryTable";
import { useGetCastMembersQuery } from "../cast/castMemberSlice";

const initialOptions = {
  page: 1,
  perPage: 4,
  search: "",
  rowsPerPage: [4, 10, 20, 30],
};

const CategoryList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCategoriesQuery(initialOptions);
  const [options, setOptions] = useState(initialOptions);
  const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteCategoryMutation();

  // console.log(data);

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
  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Category deleted`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Category not deleted`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

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
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
export default CategoryList;
