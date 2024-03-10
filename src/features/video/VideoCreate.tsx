import { Box, Paper, Typography } from "@mui/material";
import { VideoForm } from "./components/VideoForm";
import {
  initialState,
  useCreateVideoMutation,
  useGetCastMembersQuery,
  useGetCategoriesQuery,
  useGetGenresQuery,
} from "./videoSlice";
import { useSnackbar } from "notistack";
import { Video } from "../../types/Videos";
import { useEffect, useState } from "react";
import { mapVideoToForm } from "./util";

export const VideoCreate = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: categories } = useGetCategoriesQuery({});
  const { data: genres } = useGetGenresQuery({});
  const { data: castMembers } = useGetCastMembersQuery({});

  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Video created", { variant: "success" });
    }

    if (status.error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Create Video</Typography>
          </Box>
        </Box>
        <VideoForm
          video={videoState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          genres={genres?.data}
          categories={categories?.data}
          castMembers={castMembers?.data}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
