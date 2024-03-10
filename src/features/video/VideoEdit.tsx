import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../../types/Videos";
import { VideoForm } from "./components/VideoForm";
import { mapVideoToForm } from "./util";
import {
  initialState,
  useGetCastMembersQuery,
  useGetCategoriesQuery,
  useGetGenresQuery,
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "./videoSlice";

export const VideoEdit = () => {
  const id = useParams<{ id: string }>().id as string;
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [updateVideo, status] = useUpdateVideoMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCategoriesQuery({});
  const { data: genres } = useGetGenresQuery({});
  const { data: castMembers } = useGetCastMembersQuery({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
    }
  }, [video]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Video updated", { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar("Error updating video", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  // console.log(video);
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h5">Edit Form</Typography>
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
          isLoading={status.isLoading || isFetching}
        />
      </Paper>
    </Box>
  );
};
