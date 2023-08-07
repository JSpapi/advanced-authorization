import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth.api";
import { IUser } from "../../types/user.type";

interface IInitialState {
  user: (Omit<IUser, "password"> & { token: string }) | null;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AuthLogout: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(
        authApi.endpoints.current.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.isAuthenticated = true;
        }
      );
  },
});

export const { actions, reducer } = authSlice;
