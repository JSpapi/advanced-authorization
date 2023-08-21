import { api } from "./api";
import { IEmail, IUser, UserData } from "../types/user.type";
import { IOtpCode, ISuccessResponse } from "../types/resetPassword.type";

export type ResponseLoginData = Omit<IUser, "password"> & { token: string };

type LoginData = Pick<UserData, "email" | "password">;
type resetPasswordData = Pick<UserData, "username" | "password">;
type verifyCodeData = Omit<IOtpCode, "email"> & { username: string };
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
    resetPassword: builder.mutation<ISuccessResponse, resetPasswordData>({
      query: (resetData) => ({
        url: "/resetPassword",
        method: "PUT",
        body: resetData,
      }),
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    generateOtp: builder.query<IOtpCode, string>({
      query: (username) => ({
        url: "/generateOTP",
        method: "GET",
        params: { username },
      }),
    }),
    verifyOtp: builder.query<string, verifyCodeData>({
      query: ({ username, code }) => ({
        url: "/verifyOTP",
        method: "GET",
        params: { username, code },
      }),
    }),
    ressetSession: builder.query<{ flag: boolean }, void>({
      query: () => ({
        url: "/createResetSession",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendEmailMutation,
  useResetPasswordMutation,
  useCurrentQuery,
  useGenerateOtpQuery,
  useVerifyOtpQuery,
  useRessetSessionQuery,
} = authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
