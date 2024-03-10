import {
  CastMember,
  CastMemberParams,
  Result,
  CastMembers,
} from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast-members";

function parseQueryParams(params: CastMemberParams) {
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
  if (params.type) {
    query.append("type", params.type.toString());
  }
  return query.toString();
}

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type,
  })}`;
}

function updateCastMembers(params: CastMember) {
  return {
    url: `${endpointUrl}/${params.id}`,
    method: "PATCH",
    body: params,
  };
}

function deleteCastMembers({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: "POST",
    body: castMember,
  };
}

function getCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET",
  };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<CastMembers, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    deleteCastMembers: mutation<Result, { id: string }>({
      query: deleteCastMembers,
      invalidatesTags: ["CastMembers"],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMembers: mutation<Result, CastMember>({
      query: updateCastMembers,
      invalidatesTags: ["CastMembers"],
    }),
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMembersQuery,
  useDeleteCastMembersMutation,
  useCreateCastMemberMutation,
  useUpdateCastMembersMutation,
  useGetCastMemberQuery,
} = castMembersApiSlice;
