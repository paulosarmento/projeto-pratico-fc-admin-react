import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import CategoryFrom from "./components/CategoryFrom";

const CategoryCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCategory, status] = useCreateCategoryMutation();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCategory(categoryState);
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

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: "success" });
      setIsDisabled(true);
    }

    if (status.error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [status.isSuccess, enqueueSnackbar, status.error]);

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
