import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
} & TextFieldProps;

export const FormInput = ({ name, ...otherprops }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...otherprops}
          {...field}
          error={!!errors[name]?.message}
          helperText={errors[name] ? errors[name]?.message : null}
        />
      )}
    />
  );
};
