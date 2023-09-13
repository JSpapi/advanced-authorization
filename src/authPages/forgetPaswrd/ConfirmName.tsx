/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { FormInput } from "../../components/UI/FormInput";
import pswrdImg from "../../assets/password1.png";

import s from "../authStyle.module.scss";
import { useGenerateOtpQuery } from "../../services/auth.api";
import { ErrorMessage } from "../../components/UI/ErrorMessage";
import { useSendEmail } from "../../hooks/useEmail";
export const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [skip, setSkip] = useState(true);
  const { data, isSuccess, isError } = useGenerateOtpQuery(userName, {
    skip,
  });

  useSendEmail({ data, isSuccess, userName, isError });

  const loginSchema = object({
    username: string()
      .trim()
      .nonempty("Поле обязательно к заполнения")
      .min(2, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 символов"),
  });

  type RegisterInput = TypeOf<typeof loginSchema>;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, reset } = methods;

  const onFormSubmit: SubmitHandler<RegisterInput> = (user) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setUserName(user.username);
    setSkip(false);
    reset();
  };
  return (
    <div className={[s.form, s.login].join(" ")}>
      <Typography variant="h5" className={s.title}>
        Получение OTP code
      </Typography>
      <FormProvider {...methods}>
        <form className={s.fields} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={s.profile_img}>
            <Avatar
              alt="User"
              src={pswrdImg}
              sx={{ width: 90, height: 90, marginBottom: 2 }}
            />
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Введите ваше Имя на который был зарегестрирован ваш аккаунт
            </Typography>
          </div>

          <FormInput
            name="username"
            label="Имя"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
            autoComplete="off"
          />

          <LoadingButton
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ marginBottom: 1 }}
          >
            <span className="regular">Получить код</span>
          </LoadingButton>
          <Typography variant="caption">
            Нет аккаунта?
            <Link
              to="/register"
              className={s.form_link}
              state="Зарегестрироваться"
            >
              Зарегестрируйтесь
            </Link>
          </Typography>
          <ErrorMessage message={error} />
        </form>
      </FormProvider>
    </div>
  );
};
