import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
  name: "Banana",
  description: "Category 1 description",
  is_active: true,
  deleted_at: null,
  created_at: "2022-01-01T00:00:00.000Z",
  updated_at: "2022-01-01T00:00:00.000Z",
};

export const initialState = [
  category,
  { ...category, id: "2", name: "Kiwi", is_active: false },
  { ...category, id: "3", name: "Orange" },
  { ...category, id: "4", name: "Apple" },
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

// Selectors

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
