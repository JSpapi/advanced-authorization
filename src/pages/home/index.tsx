import { Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Home = () => {
  const checkTo = () => {
    toast.success("вы успешно вошли в аккаунт", {
      position: "top-center",
    });
  };
  return (
    <div>
      <Typography variant="h4">Home</Typography>
      <Link to="/register">
        <Button color="secondary" variant="contained" onClick={checkTo}>
          Test
        </Button>
      </Link>
    </div>
  );
};
