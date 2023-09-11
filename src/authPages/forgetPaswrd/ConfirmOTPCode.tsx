/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "../../components/UI/ErrorMessage";
import { FormInput } from "../../components/UI/FormInput";
import { useSendEmail } from "../../hooks/useEmail";
import {
  useGenerateOtpQuery,
  useVerifyOtpQuery,
} from "../../services/auth.api";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

import s from "../authStyle.module.scss";

export const ConfirmOTPCode = () => {
  // todo GETTING PARAMS
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState(searchParams.get("username") || "");
  const [skip, setSkip] = useState(true);
  const [otpCode, setOtpCode] = useState("");
  const [skipVerify, setSkipVerify] = useState(true);

  // !OTP CODE VERIFY REQUEST
  const {
    data: message,
    error,
    isError: isVerifyError,
    isSuccess: verified,
    isFetching,
  } = useVerifyOtpQuery(
    { username: userName, code: otpCode },
    {
      skip: skipVerify,
    }
  );

  // !OTP CODE GENERATE REQUEST
  const { data, isSuccess, isError } = useGenerateOtpQuery(userName, {
    skip,
  });

  useSendEmail({ data, isSuccess, userName, isError });
  // !RE SEND OTP CODE TO USER EMAIL
  const resendOtpcode = () => {
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
  useEffect(() => {
    if (isVerifyError) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) setErrorMessage(error.data.message);
      else setErrorMessage("Не известная ошибка");
      reset();
    } else if (verified) {
      toast("Отп подтвержден!", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate({
        pathname: "/resetPassword",
        search: createSearchParams({
          username: userName,
        }).toString(),
      });
    }
  }, [isVerifyError, verified, isFetching]);

  // TODO GET INPUT VALUE AND ACTIVATE GENERATE OTP CODE REQUEST
  const onFormSubmit: SubmitHandler<RegisterInput> = (userCode) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setOtpCode(userCode.otpCode);
    setSkipVerify(false);
    // setUserName();
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
          <ErrorMessage message={errorMessage} />
        </form>
      </FormProvider>
    </div>
  );
};
