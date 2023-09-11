/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { FormPassword } from "../../components/UI/FormPassword";
import passwordImg from "../../assets/password.png";
import loadingImg from "../../assets/padoru.gif";
import s from "../authStyle.module.scss";
import {
  useResetPasswordMutation,
  useRessetSessionQuery,
} from "../../services/auth.api";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/UI/ErrorMessage";
import { toast } from "react-toastify";
import { Preloader } from "../../components/preloader/Preloader";
import { IError } from "../../types/errorMessage.type";

export const ResetPassword = () => {
  // todo GETTING PARAMS
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState(searchParams.get("username") || "");
  const [resetPassword] = useResetPasswordMutation();
  const { isError, isLoading } = useRessetSessionQuery();

  const navigate = useNavigate();
  // !CHECK RESET SESSION IS TRUE
  useEffect(() => {
    if (isError) navigate("/confirmEmail");
  }, [isError]);

  const loginSchema = object({
    password: string()
      .trim()
      .nonempty("Поле обязательно для заполнения")
      .min(4, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 сим  волов"),
    passwordConfirm: string()
      .trim()
      .nonempty("Пожалуйста, подтвердите свой пароль"),
  }).refine((value) => value.password === value.passwordConfirm, {
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
      }, 6000);
      const id = toast.loading("Ждем ответа...");

      await resetPassword({
        password,
        username: userName,
      })
        .unwrap()
        .then((res) => {
          toast.update(id, {
            render: "Пароль обнавлен",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/login");
        })
        .catch((err: IError) => {
          toast.update(id, {
            render: err.data.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });

      reset();
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) setError(err.data.message);
      else setError("Не известная ошибка");
      reset();
    }
  };

  return isLoading ? (
    <Preloader image={loadingImg} />
  ) : (
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
