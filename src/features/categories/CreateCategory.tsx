import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import CategoryFrom from "./components/CategoryFrom";

const CategoryCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  });

  const handleChange = (e: any) => {};

  const handleToggle = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Typography variant="h4" component="h1">
            Category Create
          </Typography>
        </Box>
        <CategoryFrom
          category={category}
          isDisabled={isDisabled}
          isLoading={false}
          onSubmit={() => {}}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
export default CategoryCreate;
