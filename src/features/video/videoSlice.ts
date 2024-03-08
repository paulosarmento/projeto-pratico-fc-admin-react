import { apiSlice } from "../api/apiSlice";
import { Result, Results, Video, VideoParams } from "../../types/Videos";

const endpointUrl = "/videos";

export const initialState: Video = {
  id: "",
  title: "",
  description: "",
  year_launched: 0,
  duration: 0,
  rating: "",
  is_opened: false,
  is_published: false,
  categories_id: [],
  categories: [],
  genres_id: [],
  genres: [],
  cast_members_id: [],
  cast_members: [],
  created_at: "",
};

function parseQueryParams(params: VideoParams) {
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

const getVideos = ({ page = 1, perPage = 10, search = "" }) => {
  const params: VideoParams = { search, page, perPage };
  return `${endpointUrl}?${parseQueryParams(params)}`;
};

const deleteVideoMutation = ({ id }: { id: string }) => {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
};

const videosSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getVideos: query<Results, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    deleteVideo: mutation<Result, { id: string }>({
      query: deleteVideoMutation,
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const { useGetVideosQuery, useDeleteVideoMutation } = videosSlice;
