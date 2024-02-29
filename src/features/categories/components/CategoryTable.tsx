import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Results } from "../../../types/Category";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { deleteCategory } from "../categorySlice";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };
  const initialStatePageSize = {
    pagination: {
      paginationModel: {
        pageSize: perPage,
      },
    },
  };

  function renderIsActionCell(row: GridRenderCellParams) {
    return (
      <IconButton
        aria-label="Delete"
        color="secondary"
        onClick={() => handleDelete(row.value)}
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link
        to={`/categories/edit/${row.id}`}
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
  function mapDataToGridRows(data: Results | undefined) {
    return data && Array.isArray(data)
      ? data.map((category) => ({
          id: category.id,
          name: category.name,
          isActive: category.is_active,
          createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
        }))
      : [];
  }

  const rows = data ? mapDataToGridRows(data) : [];
  // const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ height: 600, display: "flex" }}>
      <DataGrid
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        initialState={initialStatePageSize}
        pageSizeOptions={rowsPerPage}
        rows={rows}
        slotProps={slotProps}
        slots={{ toolbar: GridToolbar }}
        // filterMode="server"
        // paginationMode="server"
        loading={isFetching}
        onFilterModelChange={handleFilterChange}
        // rowCount={rowCount}
      ></DataGrid>
    </Box>
  );
}
