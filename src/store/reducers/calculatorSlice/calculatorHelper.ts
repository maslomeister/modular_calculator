import { CalculatorState } from "./calculatorSlice";

const countDecimals = (number: number) => {
  if (Math.floor(number.valueOf()) === number.valueOf()) return 0;
  return number.toString().split(".")[1].length || 0;
};

function updateDisplay(state: CalculatorState, value: string | null) {
  if (value === null) {
    resetCalculatorWithErrorOnDisplay(state);
    return;
  }

  state.displayValue = value.replace(".", ",");
}

function doMath(first: string, second: string, operation: string) {
  let result = 0;
  let decimalsAmount = null;
  if (countDecimals(+first) > 0) {
    decimalsAmount = countDecimals(+first);
  }

  if (decimalsAmount && countDecimals(+second) > decimalsAmount) {
    decimalsAmount = countDecimals(+second);
  }

  switch (operation) {
    case "+":
      result = +first + +second;
      break;

    case "-":
      result = +first - +second;
      break;

    case "/":
      result = +first / +second;
      break;

    case "x":
      result = +first * +second;
      break;

    default:
      return null;
  }

  if (!isFinite(result) || isNaN(result)) {
    return null;
  }

  if (decimalsAmount) {
    if (result.toString().length > 16) {
      return Math.round(result).toString();
    }

    const resultDecimals = countDecimals(result);
    if (resultDecimals < decimalsAmount) {
      return result.toString();
    }

    return result.toFixed(decimalsAmount).toString();
  }

  return result.toString();
}

function afterEqualsCheck(state: CalculatorState) {
  if (state.afterEquals) {
    state.currentValue = state.displayValue.replace(",", ".");
    state.previousValue = null;
    state.currentOperation = null;
    state.result = null;
    state.decimalSet = false;
    state.afterEquals = false;
    updateDisplay(state, state.currentValue);
  }
}

const resetCalculatorWithErrorOnDisplay = (state: CalculatorState) => {
  state.previousValue = null;
  state.currentOperation = null;
  state.result = null;
  state.decimalSet = false;
  state.afterEquals = false;
  state.displayValue = "Не определено";
};

function calculatorLogic(state: CalculatorState, operation: string) {
  if (state.previousValue != null && state.currentValue != null && state.currentOperation != null) {
    //1 x 1 + ...
    const result = doMath(state.previousValue, state.currentValue, state.currentOperation);
    state.currentOperation = operation;
    state.previousValue = result;
    state.currentValue = null;
    updateDisplay(state, result);
  } else if (state.previousValue === null && state.currentValue != null && state.currentOperation === null) {
    //1 + ...
    state.currentOperation = operation;
    state.previousValue = state.currentValue;
    state.currentValue = null;
    state.decimalSet = false;
    updateDisplay(state, state.previousValue);
  } else if (state.previousValue === null && state.currentValue === null && state.currentOperation === null) {
    // / ....
    // console.log("user error");
  } else {
    // console.log("Unexpected error ocurred");
  }
}

export const registerAction = (state: CalculatorState, action: string) => {
  switch (action) {
    case "+":
      afterEqualsCheck(state);
      calculatorLogic(state, action);
      break;

    case "-":
      afterEqualsCheck(state);
      calculatorLogic(state, action);
      break;

    case "x":
      afterEqualsCheck(state);
      calculatorLogic(state, action);
      break;

    case "/":
      afterEqualsCheck(state);
      calculatorLogic(state, action);
      break;

    case ",":
      if (state.currentValue) {
        if (Number.isInteger(Number(state.currentValue))) {
          state.currentValue += ".";
          state.decimalSet = true;

          updateDisplay(state, state.currentValue);
        }
      } else {
        state.currentValue = 0 + ".";
        state.decimalSet = true;
        updateDisplay(state, state.currentValue);
      }
      break;

    case "equals":
      if (state.previousValue !== null && state.currentValue !== null && state.currentOperation !== null) {
        //1 + 1 ...
        const result = doMath(state.previousValue, state.currentValue, state.currentOperation);
        //currentOperation and currentValue are left same
        //hitting equals multiple times will repeat previous operation
        state.previousValue = result;
        updateDisplay(state, result);
        state.afterEquals = true;
      } else {
        // console.log("Unexpected error at equals");
      }
      break;

    default:
      if (state.currentValue === null) {
        state.currentValue = action;
      } else {
        if (state.displayValue === "Не определено") {
          state.currentValue = action;
        } else {
          if (state.currentValue !== "0") {
            if (state.currentValue.length <= 16) {
              state.currentValue += action;
            }
          }
        }
      }

      state.currentValue && updateDisplay(state, state.currentValue);
      break;
  }
};
