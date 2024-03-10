import { CastMembers } from "../../types/CastMembers";
import { Categories } from "../../types/Category";
import { Genres } from "../../types/Genres";
import {
  Result,
  Video,
  VideoParams,
  VideoPayload,
  Videos,
} from "../../types/Videos";
import { apiSlice } from "../api/apiSlice";

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

function getVideos({ page = 1, perPage = 10, search = "" }) {
  const params: VideoParams = { search, page, perPage };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function getVideo({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function getCategories() {
  return `categories?all=true`;
}

function getCastMembers() {
  return `cast-members?all=true`;
}

function getGenres() {
  return `genres?all=true`;
}

function deleteVideoMutation({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function updateVideoMutation(video: VideoPayload) {
  return {
    url: `${endpointUrl}/${video.id}`,
    method: "PATCH",
    body: video,
  };
}

function createVideoMutation(video: VideoPayload) {
  return {
    url: endpointUrl,
    method: "POST",
    body: video,
  };
}

const videosSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getVideos: query<Videos, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    deleteVideo: mutation<Result, { id: string }>({
      query: deleteVideoMutation,
      invalidatesTags: ["Videos"],
    }),
    getVideo: query<Result, { id: string }>({
      query: getVideo,
      providesTags: ["Videos"],
    }),
    updateVideo: mutation<Result, VideoPayload>({
      query: updateVideoMutation,
      invalidatesTags: ["Videos"],
    }),
    getCategories: query<Categories, VideoParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCastMembers: query<CastMembers, VideoParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    getGenres: query<Genres, VideoParams>({
      query: getGenres,
      providesTags: ["Genres"],
    }),
    createVideo: mutation<Result, VideoPayload>({
      query: createVideoMutation,
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useDeleteVideoMutation,
  useGetVideoQuery,
  useUpdateVideoMutation,
  useGetCategoriesQuery,
  useGetCastMembersQuery,
  useGetGenresQuery,
  useCreateVideoMutation,
} = videosSlice;
