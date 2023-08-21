import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { FormPassword } from "../../components/UI/FormPassword";
import passwordImg from "../../assets/password.png";

import s from "../authStyle.module.scss";
import {
  useResetPasswordMutation,
  useRessetSessionQuery,
} from "../../services/auth.api";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/UI/ErrorMessage";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  // todo GETTING PARAMS
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState(searchParams.get("username") || "");
  const [resetPassword] = useResetPasswordMutation();
  const { data } = useRessetSessionQuery();

  const navigate = useNavigate();

  const loginSchema = object({
    password: string()
      .trim()
      .nonempty("Поле обязательно для заполнения")
      .min(4, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 сим  волов"),
    passwordConfirm: string()
      .trim()
      .nonempty("Пожалуйста, подтвердите свой пароль"),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Пароли не совпадают",
  });

  type RegisterInput = TypeOf<typeof loginSchema>;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, reset } = methods;

  const onFormSubmit: SubmitHandler<RegisterInput> = async (newPassword) => {
    try {
      const { password } = newPassword;

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      await resetPassword({
        password,
        username: userName,
      }).unwrap();

      await toast.promise(resetPassword, {
        pending: "Ожидаем ответ...",
        success: "Пароль успешно обновлен 👌",
        error: "Произошла ошибка 🤯",
      });
      reset();

      navigate("/login");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) setError(err.data.message);
      else setError("Не известная ошибка");
      reset();
    }
  };
  return (
    <div className={[s.form, s.login].join(" ")}>
      <Typography variant="h5" className={s.title}>
        Сбросить пароль
      </Typography>
      <FormProvider {...methods}>
        <form className={s.fields} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={s.profile_img}>
            <Avatar alt="" src={passwordImg} sx={{ width: 90, height: 90 }} />
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Введите новый пароль
            </Typography>
          </div>

          <FormPassword
            name="password"
            label="Пароль"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
          />
          <FormPassword
            name="passwordConfirm"
            label="Повторите пароль"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 2 }}
          />

          <LoadingButton
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ marginBottom: 1 }}
          >
            <span className="regular">Сбросить</span>
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
