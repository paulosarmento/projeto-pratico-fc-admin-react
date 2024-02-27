import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import CategoryFrom from "./components/CategoryFrom";

const CategoryEdit = () => {
  const id = useParams().id || "";
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const handleChange = (e: any) => {};

  const handleToggle = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Typography variant="h4" component="h1">
            Category Edit
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
export default CategoryEdit;
