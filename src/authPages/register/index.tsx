import { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPassword } from "../../components/UI/FormPassword";
import { FormInput } from "../../components/UI/FormInput";
import s from "../authStyle.module.scss";
export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
    reset();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(data);
    }, 2000);
  };

  return (
    <div className={[s.form, s.register].join(" ")}>
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
          >
            <span className="regular">Зарегестрироваться</span>
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};
