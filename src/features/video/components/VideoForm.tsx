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
          <Grid item xs={12} sx={{ "& ,MuiTextField-root": { my: 1 } }}>
            <FormControl fullWidth>
              <TextField
                required
                name="title"
                label="Title"
                value={video.title}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "title" }}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="description"
                label="Description"
                value={video.description}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "description" }}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                required
                name="year_launched"
                label="Year Launched"
                value={video.year_launched}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "year_launched" }}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                required
                name="duration"
                label="Duration"
                value={video.duration}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "duration" }}
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
