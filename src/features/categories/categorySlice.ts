import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
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
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      // find index on state of category to update
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload
      );
      state.splice(index, 1);
    },
  },
});

// Selectors

export const selectCategories = (state: RootState) => state.categories;
//Select category by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return (
    category || {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: null,
      created_at: "",
      updated_at: "",
    }
  );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
