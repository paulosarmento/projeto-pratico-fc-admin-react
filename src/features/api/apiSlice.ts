import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = "http://localhost:3000/";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories", "CastMembers", "Genres", "Videos"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ baseUrl }),
});
