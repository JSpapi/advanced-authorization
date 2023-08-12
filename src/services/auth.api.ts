import { api } from "./api";
import { IEmail, IUser, UserData } from "../types/user.type";

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
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    sendEmail: builder.mutation<string, IEmail>({
      query: (emailData) => ({
        url: "/registerEmail",
        method: "POST",
        body: emailData,
      }),
    }),
  }),
});

export const {
  useCurrentQuery,
  useRegisterMutation,
  useLoginMutation,
  useSendEmailMutation,
} = authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
