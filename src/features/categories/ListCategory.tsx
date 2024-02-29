import { Box, Button, IconButton, Link, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategories } from "./categorySlice";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryList = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };
  const initialStatePageSize = {
    pagination: {
      paginationModel: {
        pageSize: 4,
      },
    },
  };

  // use categories to create rows

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
  }));

  // use columns

  const columns: GridColDef[] = [
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      field: "description",
      flex: 1,
      headerName: "Description",
    },
    {
      field: "isActive",
      flex: 1,
      headerName: "Active",
      renderCell: renderIsActiveCell,
      type: "boolean",
    },
    {
      field: "createdAt",
      flex: 1,
      headerName: "Created At",
    },
    {
      field: "id",
      flex: 1,
      headerName: "Action",
      renderCell: renderIsActionCell,
    },
  ];

  function handleDeleteCategory(id: string) {
    dispatch(deleteCategory(id));
  }

  function renderIsActionCell(row: GridRenderCellParams) {
    return (
      <IconButton
        aria-label="Delete"
        color="secondary"
        onClick={() => handleDeleteCategory(row.value)}
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link
        href={`/categories/edit/${row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Typography color={"primary"}>{row.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "green" : "red"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
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

      <Box sx={{ height: 600, display: "flex" }}>
        <DataGrid
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          initialState={initialStatePageSize}
          pageSizeOptions={[1, 2, 4]}
          rows={rows}
          slotProps={slotProps}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
export default CategoryList;
