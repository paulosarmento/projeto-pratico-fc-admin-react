import { Genre, GenreParams, GenrePayload } from "../../types/Genres";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/genres";

export const initialState = {
  id: "",
  name: "",
  is_active: false,
  categories: [],
  categories_id: "",
  created_at: "",
};

function parseQueryParams(params: GenreParams) {
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

function createGenreMutation(params: GenrePayload) {
  return {
    url: endpointUrl,
    method: "POST",
    body: params,
  };
}

export const genreSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ["Genres"],
    }),
  }),
});

export const { useCreateGenreMutation } = genreSlice;
