import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
} & TextFieldProps;

export const FormPassword = ({ name, ...otherProps }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          // id="input-with-icon-textfield"
          type={showPassword ? "text" : "password"}
          {...otherProps}
          {...field}
          error={!!errors[name]?.message}
          helperText={errors[name] ? errors[name]?.message?.toString() : null}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ margin: 0 }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ right: 0, top: "5px", position: "absolute" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
