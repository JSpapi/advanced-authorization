/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendEmailMutation } from "../services/auth.api";
import { IOtpCode } from "../types/resetPassword.type";
import { IError } from "../types/errorMessage.type";
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
          render: "На ваш email был отправлен сообщение",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate({
          pathname: "/confirmOTPCode",
          search: createSearchParams({ username: userName }).toString(),
        });
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
  };

  useEffect(() => {
    if (isSuccess || isError) {
      handleSendEmailRequest(data, userName);
    }
  }, [isSuccess, isError]);
};
