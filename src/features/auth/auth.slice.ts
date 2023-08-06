import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.type";

interface IInitialState {
  user: IUser;
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
});
