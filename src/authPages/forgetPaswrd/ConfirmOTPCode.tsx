import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { FormInput } from "../../components/UI/FormInput";
import { useSendEmail } from "../../hooks/useEmail";
import { useGenerateOtpQuery } from "../../services/auth.api";

import s from "../authStyle.module.scss";

export const ConfirmOTPCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [skip, setSkip] = useState(true);

  const [searchParams] = useSearchParams();

  // !OTP CODE GENERATE REQUEST
  const { data, isSuccess } = useGenerateOtpQuery(userName, {
    skip,
  });

  useSendEmail({ data, isSuccess, userName });

  // !RE SEND OTP CODE TO USER EMAIL
  const resendOtpcode = () => {
    setUserName(searchParams.get("username") || "");
    setSkip(false);
  };

  const navigate = useNavigate();

  const loginSchema = object({
    otpCode: string()
      .trim()
      .nonempty("Поле обязательно для заполнения")
      .min(6, "Код должен состоять не меньше 6 чисел"),
  });

  type RegisterInput = TypeOf<typeof loginSchema>;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, reset } = methods;

  // TODO CONFIRM OTP CODE FORM
  const onFormSubmit: SubmitHandler<RegisterInput> = (userCode) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    reset();
    // navigate("/resetPassword");
  };
  return (
    <div className={[s.form, s.login].join(" ")}>
      <Typography variant="h5" className={s.title}>
        Подтверждение
      </Typography>
      <FormProvider {...methods}>
        <form className={s.fields} onSubmit={handleSubmit(onFormSubmit)}>
          <FormInput
            name="otpCode"
            label="OTP код"
            type="number"
            size="small"
            margin="dense"
            variant="filled"
            sx={{ marginBottom: 1 }}
          />

          <LoadingButton
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ marginBottom: 1 }}
          >
            <span className="regular">Подтвердить</span>
          </LoadingButton>
          <Typography variant="caption">
            Не получили код?
            <button
              className={s.form_link}
              type="button"
              onClick={resendOtpcode}
            >
              Отправить код повторно
            </button>
          </Typography>
        </form>
      </FormProvider>
    </div>
  );
};
