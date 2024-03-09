import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { CastMember } from "../../types/CastMembers";
import { useCreateCastMemberMutation } from "./castMemberSlice";
import CastMemberForm from "./components/CastMembersForm";
export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  created_at: "",
};
export const CastMemberCreate = () => {
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [createCastMember, status] = useCreateCastMemberMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericValue = name === "type" ? parseInt(value, 10) : value;

    setCastMemberState({ ...castMemberState, [name]: numericValue });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { created_at, ...initialState } = castMemberState;
    await createCastMember(initialState);
  }

  useEffect(() => {
    if (status.isSuccess) {
      // setCastMemberState(initialState);
      enqueueSnackbar("Cast Member Created", { variant: "success" });
    }

    if (status.error) {
      enqueueSnackbar("Cast Member Creation Failed", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box m={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMemberForm
          castMember={castMemberState}
          isDisabled={false}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        ></CastMemberForm>
      </Paper>
    </Box>
  );
};
