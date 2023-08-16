/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendEmailMutation } from "../services/auth.api";
import { IOtpCode } from "../types/resetPassword.type";

interface IProps {
  data: IOtpCode;
  isSuccess: boolean;
  userName: string;
}

export const useSendEmail = ({ data, isSuccess, userName }: IProps) => {
  const [sendEmail] = useSendEmailMutation();
  const navigate = useNavigate();

  const handleSendEmailRequest = async (data: IOtpCode, userName: string) => {
    const text = `ОТП код для восстановления аккаунт ${data?.code}. Никому не показывайте этот код!`;
    await sendEmail({
      username: userName,
      email: data?.email,
      text,
      subject: "AK.Code - ОТП для восстановления аккаунта",
    });
    await toast.promise(sendEmail, {
      pending: "Ожидаем ответ...",
      success: "ОТП код был отправлен на ваш Email",
      error: "Произошла ошибка 🤯",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleSendEmailRequest(data, userName);
      navigate("/confirmOTPCode");
    }
  }, [isSuccess]);
};
