import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React from "react";
import { Video } from "../../../types/Videos";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genres";
import { CastMember } from "../../../types/CastMembers";
import { Link } from "react-router-dom";

export type Props = {
  video: Video;
  categories?: Category[];
  genres?: Genre[];
  castMembers?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function VideoForm({
  video,
  categories,
  genres,
  castMembers,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={video.title}
                disabled={isDisabled}
                onChange={handleChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box display={"flex"} gap={2}>
              <Button variant="contained" component={Link} to="/videos">
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={isDisabled || isLoading}
                type="submit"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
