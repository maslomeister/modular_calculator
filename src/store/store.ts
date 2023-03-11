import { configureStore } from "@reduxjs/toolkit";

import calculatorSlice from "./reducers/calculatorSlice/calculatorSlice";
import modularConstructorSlice from "./reducers/modularConstructorSlice";

export const store = configureStore({
  reducer: {
    calculator: calculatorSlice,
    modularConstructor: modularConstructorSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
