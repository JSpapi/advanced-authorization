import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  auth: "",
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
