import { api } from "./api";
import { IEmail, IUser, UserData } from "../types/user.type";
import { IOtpCode } from "../types/resetPassword.type";

export type ResponseLoginData = Omit<IUser, "password"> & { token: string };

type LoginData = Pick<UserData, "email" | "password">;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<ResponseLoginData, LoginData>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    sendEmail: builder.mutation<string, IEmail>({
      query: (emailData) => ({
        url: "/registerEmail",
        method: "POST",
        body: emailData,
      }),
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    generateOtp: builder.query<IOtpCode, void>({
      query: (userEmail) => ({
        url: "/generateOTP",
        method: "GET",
        params: { userEmail },
      }),
    }),
  }),
});

export const {
  useCurrentQuery,
  useRegisterMutation,
  useLoginMutation,
  useSendEmailMutation,
  useGenerateOtpQuery,
} = authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
