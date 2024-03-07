import { Box, Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import { CastMemberCreate } from "../features/cast/CreateCastMember";
import { CastMemberEdit } from "../features/cast/EditCastMembers";
import { CastMembersList } from "../features/cast/ListCastMembers";
import CategoryCreate from "../features/categories/CreateCategory";
import CategoryEdit from "../features/categories/EditCategory";
import CategoryList from "../features/categories/ListCategory";
import { GenreCreate } from "../features/genre/GenreCreate";
import { GenreEdit } from "../features/genre/GenreEdit";
import { GenreList } from "../features/genre/GenreList";
import { VideoList } from "../features/video/VideoList";
import { VideoCreate } from "../features/video/VideoCreate";
import { VideoEdit } from "../features/video/VideoEdit";

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
    path: "/cast-members/create",
    element: <CastMemberCreate />,
  },
  {
    path: "/cast-members/edit/:id",
    element: <CastMemberEdit />,
  },
  {
    path: "/genres/create",
    element: <GenreCreate />,
  },
  {
    path: "/genres/edit/:id",
    element: <GenreEdit />,
  },
  {
    path: "/genres",
    element: <GenreList />,
  },
  {
    path: "/videos",
    element: <VideoList />,
  },
  {
    path: "/videos/create",
    element: <VideoCreate />,
  },
  {
    path: "/videos/edit/:id",
    element: <VideoEdit />,
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
