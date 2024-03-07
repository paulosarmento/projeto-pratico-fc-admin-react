import {
  Category,
  CategoryParams,
  Result,
  Results,
} from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();
  if (params.page) {
    query.append("page", params.page.toString());
  }
  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }
  if (params.search) {
    query.append("search", params.search);
  }
  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }
  return query.toString();
}

function getCategories({
  page = 1,
  perPage = 10,
  search = "",
  isActive = true,
}: CategoryParams) {
  const params = { search, page, perPage, isActive };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category,
  };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PATCH",
    body: category,
  };
}
function getCategory({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApiSlice;
