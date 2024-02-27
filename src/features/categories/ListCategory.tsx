import { Box, Button, Link, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const CategoryList = () => {
  const categories = useAppSelector(selectCategories);

  // use categories to create rows

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  // use columns

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
  ];

  return (
    <Box maxWidth={"lg"} sx={{ mt: 4, mb: 4 }}>
      <Box display={"flex"} justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[1, 2, 4]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 2,
              },
            },
          }}
        />
      </div>
    </Box>
  );
};
export default CategoryList;
