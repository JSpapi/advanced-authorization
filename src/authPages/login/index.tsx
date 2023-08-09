import { useState } from "react";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../components/UI/FormInput";
import { FormPassword } from "../../components/UI/FormPassword";
import { Link, useNavigate } from "react-router-dom";
import s from "../authStyle.module.scss";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { useLoginMutation } from "../../services/auth.api";
import { ErrorMessage } from "../../components/UI/ErrorMessage";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [loginUser] = useLoginMutation();

  const loginSchema = object({
    email: string()
      .trim()
      .nonempty("Поле обязательно для заполнения")
      .email("электронная почта недействительна"),
    password: string()
      .trim()
      .nonempty("Поле обязательно для заполнения")
      .min(4, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 символов"),
  });

  type RegisterInput = TypeOf<typeof loginSchema>;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, reset, resetField } = methods;

  const onFormSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      await loginUser(data).unwrap();
      reset();
      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) setError(err.data.message);
      resetField("password");
    }
  };

  return (
    <div className={[s.form, s.login].join(" ")}>
      <Typography variant="h5" className={s.title}>
        Войти
      </Typography>
      <FormProvider {...methods}>
        <form className={s.fields} onSubmit={handleSubmit(onFormSubmit)}>
          <FormInput
            name="email"
            label="Email"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
          />

          <FormPassword
            name="password"
            label="Пароль"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
          />
          <Link to="/confirmEmail" style={{ marginBottom: 15 }}>
            Забыли пароль?
          </Link>

          <LoadingButton
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ marginBottom: 1 }}
          >
            <span className="regular">Войти</span>
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
