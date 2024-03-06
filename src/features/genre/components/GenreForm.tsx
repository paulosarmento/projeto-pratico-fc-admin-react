import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  genre: any;
  categories: any;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function GenreForm({
  genre,
  categories,
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
                value={genre.name}
                disabled={isDisabled}
                onChange={handleChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              multiple
              loading={isLoading}
              options={[]}
              value={genre.categories}
              disabled={isDisabled || !categories}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />
              )}
            ></Autocomplete>
          </Grid>
          <Grid item xs={12}>
            <Box display={"flex"} gap={2}>
              <Button variant="contained" component={Link} to="/genres">
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
