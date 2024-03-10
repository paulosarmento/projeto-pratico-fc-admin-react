import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CastMembers } from "../../../types/CastMembers";

type Props = {
  data: CastMembers | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export function CastMembersTable({
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
        to={`/cast-members/edit/${row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Typography color={"primary"}>{row.value}</Typography>
      </Link>
    );
  }

  function renderTypeCell(rowData: GridRenderCellParams) {
    // console.log(rowData.value);
    return (
      <Typography color="primary">
        {rowData.value === 1 ? "Actor" : "Director"}
      </Typography>
    );
  }
  const columns: GridColDef[] = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      flex: 1,
      field: "type",
      headerName: "Type",
      renderCell: renderTypeCell,
    },
    {
      flex: 1,
      field: "created_at",
      headerName: "Created At",
    },
    {
      flex: 1,
      field: "id",
      headerName: "Action",
      renderCell: renderIsActionCell,
    },
  ];

  function mapDataToGridRows(data: CastMembers) {
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
      created_at: castMember.created_at
        ? new Date(castMember.created_at).toLocaleDateString("pt-br", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : "",
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
        // onPageChange={handleOnPageChange}
        // onPageSizeChange={handleOnPageSizeChange}
        onPaginationModelChange={() => {}}
        rowCount={rowCount}
      ></DataGrid>
    </Box>
  );
}
