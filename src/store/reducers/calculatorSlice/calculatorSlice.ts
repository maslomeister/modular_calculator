import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerAction } from "./calculatorHelper";
// import { calculatorAction } from "./calculatorHelper";

export interface CalculatorState {
  previousValue: string | null;
  currentValue: string | null;
  result: string | null;
  displayValue: string;
  decimalSet: boolean;
  afterEquals: boolean;
  currentOperation: string | null;
}

export const initialCalculatorState: CalculatorState = {
  previousValue: null,
  currentValue: null,
  result: null,
  displayValue: "0",
  decimalSet: false,
  afterEquals: false,
  currentOperation: null,
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: initialCalculatorState,

  reducers: {
    registerKey: (state, action: PayloadAction<string>) => {
      registerAction(state, action.payload);
      return state;
    },
    resetCalculator: () => {
      return initialCalculatorState;
    },
  },
});

export const { resetCalculator, registerKey } = calculatorSlice.actions;

export default calculatorSlice.reducer;
