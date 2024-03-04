import { Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../categories/categorySlice";
import { useDeleteCastMembersMutation } from "./castMemberSlice";

export const CastMembersList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [search, setSearch] = useState("");
  const { data, isFetching, error } = useGetCategoriesQuery({
    page,
    perPage,
    search,
  });
  const [rowsPerPage] = useState([4, 10, 20, 30]);
  const [deleteCastMember, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteCastMembersMutation();

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

  return <Typography>oi</Typography>;
};
