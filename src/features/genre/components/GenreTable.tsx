import { Box, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Genres } from "../../../types/Genres";
type Props = {
  data: Genres | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage: number[];
  handleDelete: (id: string) => void;
  handleOnPageChange: (page: number) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
};
export default function GenreTable({
  data,
  isFetching,
  perPage,
  rowsPerPage,
  handleDelete,
  handleOnPageChange,
  handleOnPageSizeChange,
  handleFilterChange,
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

  const columns: GridColDef[] = [
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      field: "id",
      flex: 1,
      headerName: "Actions",
      type: "string",
      renderCell: renderIsActionCell,
    },
  ];
  function renderIsActionCell(row: GridRenderCellParams) {
    return (
      <IconButton
        aria-label="Delete"
        color="secondary"
        onClick={() => handleDelete(row.value)}
      >
        <GridDeleteIcon />
      </IconButton>
    );
  }
  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link to={`/genres/edit/${row.id}`} style={{ textDecoration: "none" }}>
        <Typography color={"primary"}>{row.value}</Typography>
      </Link>
    );
  }

  function mapDataToGridRows(data: Genres) {
    const { data: genres } = data;

    return genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
      categories: genre.categories,
    }));
  }

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;

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
        loading={isFetching}
        onFilterModelChange={handleFilterChange}
        // filterMode="server"
        // paginationMode="server"
        onPaginationModelChange={() => {}}
        rowCount={rowCount}
      ></DataGrid>
    </Box>
  );
}
