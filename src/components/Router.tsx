import * as React from "react";
import { Box, Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import CategoryList from "../features/categories/ListCategory";
import CategoryCreate from "../features/categories/CreateCategory";
import CategoryEdit from "../features/categories/EditCategory";
import { CastMembersList } from "../features/cast/ListCastMembers";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <CategoryList />,
  },
  {
    path: "/categories",
    element: <CategoryList />,
  },
  {
    path: "/categories/create",
    element: <CategoryCreate />,
  },
  {
    path: "/categories/edit/:id",
    element: <CategoryEdit />,
  },
  {
    path: "/cast-members",
    element: <CastMembersList />,
  },

  {
    path: "*",
    element: (
      <Box sx={{ color: "white" }}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">Page not found</Typography>
      </Box>
    ),
  },
]);
