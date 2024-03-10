import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Genre } from "../../../types/Genres";
import { Videos } from "../../../types/Videos";
import { Category } from "../../../types/Category";
import { CastMember } from "../../../types/CastMembers";
type Props = {
  data: Videos | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage: number[];
  handleDelete: (id: string) => void;
  handleOnPageChange: (page: number) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
};
export default function VideosTable({
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

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link to={`/videos/edit/${row.id}`} style={{ textDecoration: "none" }}>
        <Typography color={"primary"}>{row.value}</Typography>
      </Link>
    );
  }
  function renderGenresCell(row: GridRenderCellParams) {
    const genres = row.value as Genre[];
    const twoFirstGenres = genres.slice(0, 2);
    const remainingGenres = genres.length - twoFirstGenres.length;

    return (
      <Box style={{ overflow: "scroll" }}>
        {twoFirstGenres.map((genre, index) => (
          <Chip
            sx={{ fontSize: "0.6rem", marginRight: 1 }}
            key={index}
            label={genre.name}
          />
        ))}

        {remainingGenres > 0 && (
          <Tooltip title={genres.map((genre) => genre.name).join(", ")}>
            <Chip
              sx={{ fontSize: "0.6rem", marginRight: 1 }}
              label={`+${remainingGenres}`}
            />
          </Tooltip>
        )}
      </Box>
    );
  }

  function renderCategoriesCell(row: GridRenderCellParams) {
    const categories = row.value as Category[];
    const twoFirstCategories = categories.slice(0, 2);
    const remainingCategories = categories.length - twoFirstCategories.length;

    return (
      <Box style={{ overflow: "scroll" }}>
        {twoFirstCategories.map((category, index) => (
          <Chip
            sx={{ fontSize: "0.6rem", marginRight: 1 }}
            key={index}
            label={category.name}
          />
        ))}

        {remainingCategories > 0 && (
          <Tooltip
            title={categories.map((category) => category.name).join(", ")}
          >
            <Chip
              sx={{ fontSize: "0.6rem", marginRight: 1 }}
              label={`+${remainingCategories}`}
            />
          </Tooltip>
        )}
      </Box>
    );
  }

  function renderCastMembersCell(row: GridRenderCellParams) {
    const castMembers = row.value as CastMember[];
    const twoFirstCastMembers = castMembers.slice(0, 2);
    const remainingCastMembers =
      castMembers.length - twoFirstCastMembers.length;

    return (
      <Box style={{ overflow: "scroll" }}>
        {twoFirstCastMembers.map((castMember, index) => (
          <Chip
            sx={{ fontSize: "0.6rem", marginRight: 1 }}
            key={index}
            label={castMember.name}
          />
        ))}

        {remainingCastMembers > 0 && (
          <Tooltip
            title={castMembers.map((castMember) => castMember.name).join(", ")}
          >
            <Chip
              sx={{ fontSize: "0.6rem", marginRight: 1 }}
              label={`+${remainingCastMembers}`}
            />
          </Tooltip>
        )}
      </Box>
    );
  }

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

  const columns: GridColDef[] = [
    {
      field: "title",
      flex: 1,
      headerName: "Title",
      renderCell: renderNameCell,
    },
    {
      field: "genres",
      flex: 1,
      headerName: "Genres",
      renderCell: renderGenresCell,
    },
    {
      field: "categories",
      flex: 1,
      headerName: "Categories",
      renderCell: renderCategoriesCell,
    },
    {
      field: "cast_members",
      flex: 1,
      headerName: "Cast Members",
      renderCell: renderCastMembersCell,
    },
    {
      field: "id",
      flex: 1,
      headerName: "Actions",
      type: "string",
      renderCell: renderIsActionCell,
    },
  ];

  function mapDataToGridRows(data: Videos) {
    const { data: videos } = data;

    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      genres: video.genres,
      categories: video.categories,
      cast_members: video.cast_members,
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
