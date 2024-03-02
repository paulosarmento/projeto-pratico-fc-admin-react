import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "https://codeflix-adm-api-git-main-paulosarmento.vercel.app/";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ baseUrl }),
});
