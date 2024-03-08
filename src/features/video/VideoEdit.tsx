import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialState, useGetVideoQuery } from "./videoSlice";
import { Video } from "../../types/Videos";
import { VideoForm } from "./components/VideoForm";

export const VideoEdit = () => {
  const id = useParams<{ id: string }>().id as string;
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [status, setStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await videoState;
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

  console.log(video);
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
          categories={[]}
          castMembers={[]}
          genres={[]}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isDisabled={status.isLoading}
          isLoading={status.isLoading || isFetching}
        />
      </Paper>
    </Box>
  );
};
