import { api } from "./api";
import { IUser, UserData } from "../types/user.type";

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
        url: "/register",
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
  }),
});

export const { useCurrentQuery, useRegisterMutation, useLoginMutation } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
