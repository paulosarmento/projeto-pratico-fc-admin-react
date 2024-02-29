import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category, createCategory } from "./categorySlice";
import CategoryFrom from "./components/CategoryFrom";
import { useAppDispatch } from "../../app/hooks";
import { useSnackbar } from "notistack";

const CategoryCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  });
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createCategory(categoryState));
    enqueueSnackbar("Category Created", { variant: "success" });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
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
          category={categoryState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleToggle={handleToggle}
          isDisabled={isDisabled}
          isLoading={false}
        />
      </Paper>
    </Box>
  );
};
export default CategoryCreate;
