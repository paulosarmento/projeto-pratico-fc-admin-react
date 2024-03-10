import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { Video } from "../../../types/Videos";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genres";
import { CastMember } from "../../../types/CastMembers";
import { Link } from "react-router-dom";
import { AutoCompleteFields } from "../../../components/AutoCompleteFields";

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

const ratingOptions = [
  { label: "L", value: "L" },
  { label: "10", value: "10" },
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "18", value: "18" },
];

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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            <FormControl fullWidth>
              <TextField
                name="title"
                label="Title"
                value={video.title}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "title" }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                minRows={4}
                name="description"
                label="Description"
                disabled={isDisabled}
                onChange={handleChange}
                value={video.description}
                inputProps={{ "data-testid": "description" }}
              />
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    name="year_launched"
                    label="Year Launched"
                    disabled={isDisabled}
                    onChange={handleChange}
                    value={video.year_launched}
                    inputProps={{ "data-testid": "year_launched" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    name="duration"
                    label="Duration"
                    disabled={false}
                    value={video.duration}
                    onChange={handleChange}
                    inputProps={{ "data-testid": "duration" }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteFields
                name="categories"
                label="Categories"
                values={video.categories}
                options={categories || []}
                isLoading={isLoading}
                isDisabled={isDisabled}
                handleChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                alignContent={"center"}
                justifyContent={"space-between"}
                spacing={2}
              >
                <Grid item xs={6}>
                  <AutoCompleteFields
                    name="genres"
                    label="Genres"
                    values={video.genres}
                    options={genres || []}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    handleChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <AutoCompleteFields
                    name="cast_members"
                    label="Cast Members"
                    values={video.cast_members}
                    options={castMembers || []}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    handleChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            <FormControl>
              <FormLabel component="legend">Rating</FormLabel>
              <RadioGroup
                row
                name="rating"
                value={video.rating}
                onChange={handleChange}
              >
                {ratingOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Box display="flex" sx={{ my: 2 }} gap={2}>
          <Button variant="contained" component={Link} to="/videos">
            Back
          </Button>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
