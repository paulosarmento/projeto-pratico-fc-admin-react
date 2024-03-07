import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCastMembersMutation,
  useGetCastMembersQuery,
} from "./castMemberSlice";
import { CastMembersTable } from "./components/CastMembersTable";
const initialOptions = {
  page: 1,
  perPage: 10,
  search: "",
  rowsPerPage: [4, 10, 20, 30],
};

export const CastMembersList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState(initialOptions);
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteCastMembersMutation();

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
  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Cast Member deleted`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Cast Member not deleted`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching Cast Member</Typography>;
  }

  return (
    <Box maxWidth={"lg"} sx={{ mt: 4, mb: 4 }}>
      <Box display={"flex"} justifyContent="flex-end">
        <Button
          color="secondary"
          component={Link}
          to="/cast-members/create"
          style={{ marginBottom: "1rem" }}
          variant="contained"
        >
          New Cast Members
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
