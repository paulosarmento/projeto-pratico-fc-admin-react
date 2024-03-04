import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { CastMember } from "../../../types/CastMembers";

type Props = {
  castMember: CastMember;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CastMemberForm({
  castMember,
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
                value={castMember.name}
                disabled={isDisabled}
                onChange={handleChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                aria-labelledby="type of cast member"
                defaultValue="Director"
                name="type"
                value={castMember.type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Director"
                />

                <FormControlLabel value={1} control={<Radio />} label="Actor" />
              </RadioGroup>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" href="/cast-members">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
