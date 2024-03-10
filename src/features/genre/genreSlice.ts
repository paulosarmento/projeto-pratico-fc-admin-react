import { Categories } from "../../types/Category";
import {
  Genre,
  GenreParams,
  GenrePayload,
  Result,
  Genres,
} from "../../types/Genres";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/genres";

export const initialState = {
  id: "",
  name: "",
  is_active: false,
  categories: [],
  categories_id: [],
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

function getCategories({
  page = 1,
  perPage = 10,
  search = "",
  isActive = true,
}: GenreParams) {
  const params = { search, page, perPage, isActive };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}
function getGenres({ page = 1, perPage = 10, search = "" }) {
  const params = { search, page, perPage };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteGenreMutation({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function getGenre({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateGenreMutation(genre: GenrePayload) {
  return {
    url: `${endpointUrl}/${genre.id}`,
    method: "PATCH",
    body: genre,
  };
}

export const genreSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Categories, GenreParams>({
      query: getCategories,
      providesTags: ["Genres"],
    }),
    getGenre: query<Result, { id: string }>({
      query: getGenre,
      providesTags: ["Genres"],
    }),
    updateGenre: mutation<Genre, GenrePayload>({
      query: updateGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    deleteGenre: mutation<Genre, { id: string }>({
      query: deleteGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    getGenres: query<Genres, GenreParams>({
      query: getGenres,
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useGetCategoriesQuery,
  useGetGenreQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetGenresQuery,
} = genreSlice;
