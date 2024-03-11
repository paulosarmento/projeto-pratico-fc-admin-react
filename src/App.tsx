import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CategoryList from "./features/categories/ListCategory";
import CategoryCreate from "./features/categories/CreateCategory";
import CategoryEdit from "./features/categories/EditCategory";
import { CastMemberCreate } from "./features/cast/CreateCastMember";
import { CastMemberEdit } from "./features/cast/EditCastMembers";
import { GenreList } from "./features/genre/GenreList";
import { GenreCreate } from "./features/genre/GenreCreate";
import { GenreEdit } from "./features/genre/GenreEdit";
import { VideoList } from "./features/video/VideoList";
import { VideoCreate } from "./features/video/VideoCreate";
import { VideoEdit } from "./features/video/VideoEdit";
import { CastMembersList } from "./features/cast/ListCastMembers";

function App() {
  return (
    <div data-testid="app">
      <Layout>
        <Routes>
          <Route path="/" element={<CategoryList />} />

          {/* Category */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/edit/:id" element={<CategoryEdit />} />

          {/* Cast members */}
          <Route path="/cast-members" element={<CastMembersList />} />
          <Route path="/cast-members/create" element={<CastMemberCreate />} />
          <Route path="/cast-members/edit/:id" element={<CastMemberEdit />} />

          {/* Genre */}
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/create" element={<GenreCreate />} />
          <Route path="/genres/edit/:id" element={<GenreEdit />} />

          {/* Videos */}
          <Route path="/videos" element={<VideoList />} />
          <Route path="/videos/create" element={<VideoCreate />} />
          <Route path="/videos/edit/:id" element={<VideoEdit />} />

          <Route
            path="*"
            element={
              <Box sx={{ color: "white" }}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found</Typography>
              </Box>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
