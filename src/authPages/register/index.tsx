/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPassword } from "../../components/UI/FormPassword";
import { FormInput } from "../../components/UI/FormInput";
import s from "../authStyle.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { convertToBase } from "../../utils/convert";
import {
  useRegisterMutation,
  useSendEmailMutation,
} from "../../services/auth.api";
import { toast } from "react-toastify";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/UI/ErrorMessage";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imgFile, setImgFile] = useState("");
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const [sendEmail] = useSendEmailMutation();

  const registerSchema = object({
    username: string()
      .trim()
      .nonempty("Поле обязательно к заполнения")
      .min(2, "Имя должно состоять не меньше 2 символов")
      .max(32, "Имя должно состоять не больше 32 символов"),
    email: string()
      .trim()
      .nonempty("Поле обязательно к заполнения")
      .email("электронная почта недействительна"),
    password: string()
      .trim()
      .nonempty("Поле обязательно к заполнения")
      .min(4, "Пароль должен состоять не меньше 2 символов")
      .max(32, "Пароль должен состоять не больше 32 символов"),
    passwordConfirm: string()
      .trim()
      .nonempty("Пожалуйста, подтвердите свой пароль"),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Пароли не совпадают",
  });

  type RegisterInput = TypeOf<typeof registerSchema>;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, reset } = methods;

  const onFormSubmit: SubmitHandler<RegisterInput> = async (data) => {
    // const formData = new FormData();
    // formData.append('picture', data.)

    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm, ...rest } = Object.assign(data, {
        profile: imgFile,
      });
      await registerUser(rest).unwrap();
      reset();
      navigate("/");

      await toast.promise(registerUser, {
        pending: "Ожидаем ответ...",
        success: "Аккаунт успешно создан 👌",
        error: "Произошла ошибка 🤯",
      });

      const { email, username } = data;
      if (!isLoading) {
        await sendEmail({ email, username }).unwrap();
        await toast.promise(sendEmail, {
          pending: "Ожидаем ответ...",
          success: "Мы отправили на ваш Email сообщение",
          error: "Произошла ошибка 🤯",
        });
      }
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) setError(err.data.message);
      else setError("Не известная ошибка");
      reset();
    }
  };
  // !CAN NOT HANDLE WITH TYPE PROBLEM NULL  AND HAD TO USE ANY HERE, AFTER GETTING  MORE INFO GONNA SOLVE IT
  const uploadImg = async (e: any) => {
    const base64 = await convertToBase(e.target.files[0]);

    setImgFile(base64);
  };

  return (
    <div className={[s.form, s.register].join(" ")}>
      <Typography variant="h5" className={s.title}>
        Зарегестрироваться
      </Typography>
      <FormProvider {...methods}>
        <form className={s.fields} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={s.profile_img}>
            <label htmlFor="profile">
              <Avatar
                alt="Avatar"
                src={imgFile || "/broken-image.jpg"}
                sx={{ width: 90, height: 90 }}
              />
            </label>

            <input
              type="file"
              id="profile"
              name="profile"
              onChange={uploadImg}
              accept="image/*"
            />
            <Typography variant="body2" sx={{ margin: "10px 0px" }}>
              Нажмите на аватар что бы поменять
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
            name="username"
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
            sx={{ marginBottom: 1 }}
          >
            <span className="regular">Зарегестрироваться</span>
          </LoadingButton>

          <Typography variant="caption">
            Уже зарегистрированы?
            <Link to="/login" className={s.form_link} state="Войти">
              Войдите
            </Link>
          </Typography>
          <ErrorMessage message={error} />
        </form>
      </FormProvider>
    </div>
  );
};
