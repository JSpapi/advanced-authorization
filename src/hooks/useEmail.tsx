/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendEmailMutation } from "../services/auth.api";
import { IOtpCode } from "../types/resetPassword.type";

interface IProps {
  data?: IOtpCode;
  isSuccess: boolean;
  isError: boolean;
  userName: string;
}

export const useSendEmail = ({
  data,
  isSuccess,
  userName,
  isError,
}: IProps) => {
  const [sendEmail] = useSendEmailMutation();
  const navigate = useNavigate();

  const handleSendEmailRequest = async (
    data: IOtpCode | undefined,
    userName: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const text = `ОТП код для восстановления аккаунт ${data?.code}. Никому не показывайте этот код!`;

    const id = toast.loading("Please wait...");
    await sendEmail({
      username: userName,
      email: data?.email,
      text,
      subject: "AK.Code - ОТП для восстановления аккаунта",
    })
      .unwrap()
      .then((res) => {
        toast.update(id, {
          render: "All is good",
          type: "success",
          isLoading: false,
        });
        navigate({
          pathname: "/confirmOTPCode",
          search: createSearchParams({ username: userName }).toString(),
        });
      })
      .catch((err) => {
        console.log(err);

        toast.update(id, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
        });
      });

    // await toast.promise(sendEmail, {
    //   pending: "Ожидаем ответ...",
    //   success: "ОТП код был отправлен на ваш Email",
    //   error: "Произошла ошибка 🤯",
    // });
  };

  useEffect(() => {
    if (isSuccess || isError) {
      handleSendEmailRequest(data, userName);
    }
  }, [isSuccess, isError]);
};
