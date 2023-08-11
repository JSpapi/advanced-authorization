import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.api";

export const listenerMiddleware = createListenerMiddleware();
// !FOR SIGN UP
listenerMiddleware.startListening({
  matcher:
    authApi.endpoints.login.matchFulfilled ||
    authApi.endpoints.register.matchFulfilled,

  effect: ({ payload }, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (payload.token) localStorage.setItem("token", payload.token);
  },
});

// !FOR SIGN IN
listenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchFulfilled,

  effect: ({ payload }, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (payload.token) localStorage.setItem("token", payload.token);
  },
});
