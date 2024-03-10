import { Box, Typography } from "@mui/material";
import React from "react";

const backgroundColors = {
  L: "#FF0000",
  "10": "#FFA500",
  "12": "#FFFF00",
  "14": "#00FF00",
  "16": "#0000FF",
  "18": "#800080",
};

type Props = {
  rating: "L" | "10" | "12" | "14" | "16" | "18";
};
export function Rating({ rating }: Props) {
  return (
    <Box
      sx={{
        "& > :first-child": { mr: 0 },
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
