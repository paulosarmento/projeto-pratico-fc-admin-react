import { createSlice } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}
const category: Category = {
  id: "1",
  name: "Category 1",
  description: "Category 1 description",
  is_active: true,
  deleted_at: null,
  created_at: "2022-01-01T00:00:00.000Z",
  updated_at: "2022-01-01T00:00:00.000Z",
};

export const initialState = [
  category,
  { ...category, id: "2", name: "Category 2" },
  { ...category, id: "3", name: "Category 3" },
  { ...category, id: "4", name: "Category 4" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
  },
});

export default categoriesSlice.reducer;
