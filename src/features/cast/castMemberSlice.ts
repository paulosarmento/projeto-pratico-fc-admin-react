import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CastMember, CastMemberParams, Results } from "../../types/CastMembers";

const endpointUrl = "/cast-members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  created_at: "",
};

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

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
  }),
});

export const { useGetCastMembersQuery } = castMembersApiSlice;
