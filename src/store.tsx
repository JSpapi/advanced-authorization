import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./features/auth/auth.slice";
import { listenerMiddleware } from "./middleware/authTokens";
import { api } from "./services/api";

const reducers = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
