import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastMember } from "../../types/CastMembers";
import {
  useGetCastMemberQuery,
  useUpdateCastMembersMutation,
} from "./castMemberSlice";
import CastMemberForm from "./components/CastMembersFrom";
export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  created_at: "",
};
export const CastMemberEdit = () => {
  const id = useParams().id ?? "";
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id });

  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  const [updateCastMember, status] = useUpdateCastMembersMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericValue = name === "type" ? parseInt(value, 10) : value;

    setCastMemberState({ ...castMemberState, [name]: numericValue });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCastMember(castMemberState);
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Cast Member Updated", { variant: "success" });
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
            <Typography variant="h4">Edit Cast Member</Typography>
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
