import {
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormInput } from "../../components/UI/FormInput";
import { FormPassword } from "../../components/UI/FormPassword";
import { object, string, TypeOf } from "zod";
import s from "../authStyle.module.scss";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const registerSchema = object({
    name: string()
      .nonempty("Поле обязательно для заполнения")
      .min(2, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 символов"),
    email: string()
      .nonempty("Поле обязательно для заполнения")
      .email("электронная почта недействительна"),
    password: string()
      .nonempty("Поле обязательно для заполнения")
      .min(4, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 символов"),
    passwordConfirm: string().nonempty("Пожалуйста, подтвердите свой пароль"),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Пароли не совпадают",
  });

  type RegisterInput = TypeOf<typeof registerSchema>;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, reset } = methods;

  const onFormSubmit: SubmitHandler<RegisterInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(data);
    }, 2000);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={s.form}>
      <Typography variant="h5" className={s.title}>
        Зарегестрироваться
      </Typography>
      <FormProvider {...methods}>
        <form className={s.fields} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={s.profile_img}>
            <Avatar
              alt=""
              src="/broken-image.jpg"
              sx={{ width: 90, height: 90 }}
            />
            <Typography variant="body2" sx={{ margin: "10px 0px" }}>
              Нажмите на аватар что бы поменять{" "}
            </Typography>
          </div>

          <FormInput
            name="email"
            label="Email"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
          />
          <FormInput
            name="name"
            label="Имя"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
          />

          <TextField
            id="input-with-icon-textfield"
            label="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ margin: 0 }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ right: 0, position: "absolute" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
          <button type="submit">check here</button>
        </form>
      </FormProvider>
    </div>
  );
};
