import { Alert } from "@mui/material";
import React from "react";

interface Iprops {
  message?: string;
}

export const ErrorMessage = ({ message }: Iprops) => {
  if (!message) return null;
  return <Alert severity="error">{message}</Alert>;
};
