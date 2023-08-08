import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.api";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher:
    authApi.endpoints.register.matchFulfilled ||
    authApi.endpoints.login.matchFulfilled,
  effect: ({ payload }, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (payload.token) {
      localStorage.setItem("token", payload.token);
    }
  },
});
