import { Box, Paper, Typography } from "@mui/material";
import { VideoForm } from "./components/VideoForm";
import { initialState } from "./videoSlice";

export const VideoCreate = () => {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Create Video</Typography>
          </Box>
        </Box>
        <VideoForm
          video={{
            ...initialState,
          }}
          handleChange={() => {}}
          handleSubmit={() => {}}
          genres={[]}
          categories={[]}
          castMembers={[]}
          isDisabled={false}
          isLoading={false}
        />
      </Paper>
    </Box>
  );
};
