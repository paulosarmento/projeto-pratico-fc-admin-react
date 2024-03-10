import { Box, Typography } from "@mui/material";
import React from "react";

const backgroundColors = {
  L: "#39B549",
  "10": "#20A3D4",
  "12": "#E79738",
  "14": "#E35E00",
  "16": "#d00003",
  "18": "#000000",
};

type Props = {
  rating: "L" | "10" | "12" | "14" | "16" | "18";
};
export function Rating({ rating }: Props) {
  return (
    <Box
      sx={{
        "& > :first-of-type": { mr: 0 },
        width: 40,
        height: 40,
        borderRadius: "4px",
        backgroundColor: backgroundColors[rating],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{rating}</Typography>
    </Box>
  );
}
