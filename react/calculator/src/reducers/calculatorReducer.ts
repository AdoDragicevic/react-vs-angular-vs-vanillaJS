import { getLastValAndIndxFromArr } from "../helpers/helpers";
import { MathOperations } from "../models/calculator.models";
import { CalculatorReducer } from "../models/calculator.models";

const calculatorReducer: CalculatorReducer = (state, action) => {
  switch (action) {
    case "reset":
      return reset();
    case "-/+":
      return togglePosNegNum();
    case ".":
      return addDot();
    case "%":
      return calcPercent();
    case "=":
      return calcAll();
    case "+":
    case "-":
    case "*":
    case "/":
      return addOperation(action);
    default:
      return addNumber(action);
  }

  function reset() {
    return {
      nums: ["0"],
      operations: []
    }
  };

  function addDot() {
    const [ num ] = getLastValAndIndxFromArr<string>(state.nums);
    const newNum = num.includes(".") ? num : `${num}.`;
    const newNums = [...state.nums];
    newNums.pop();
    newNums.push(newNum);
    return {
      ...state,
      nums: newNums
    }
  }

  function calcAll() {
    if (state.nums.length < 2) return state;
    return performOperations(["*", "/", "+", "-"]);
  }
  
  function performOperations(operationsToPerform: MathOperations[]) {
    const newOperations = state.operations.slice();
    const newNums = state.nums.slice();
    const helperRecursion = (arr: string[]) => {
      if (arr.length <= 0) return state;
      const operation = arr[0] as MathOperations;
      let indx = newOperations.indexOf(operation);
      while (indx >= 0) {
        const n1 = Number(newNums[indx]),
              n2 = Number(newNums[indx + 1]),
              sum = calc(n1, n2, operation);
        newOperations.splice(indx, 1);
        newNums.splice(indx, 2, sum.toString());
        indx = newOperations.indexOf(operation);
      }
      helperRecursion(arr.slice(1));
    }
    helperRecursion(operationsToPerform);
    return {
      nums: newNums,
      operations: newOperations
    }
  }

  function togglePosNegNum() {
    const [ num ] = getLastValAndIndxFromArr<string>(state.nums);
    const newNums = state.nums.slice(0, -1);
    const newNum = toggleNegativeNum(num);
    newNums.push(newNum);
    return {
      ...state,
      nums: newNums
    }
  }

  function toggleNegativeNum(num: string) {
    if (num === "0") return "0";
    return num[0] === "-" ? num.slice(1) : `-${num}`;
  }

  function addOperation(operation: MathOperations) {
    const newOperations = state.operations.slice();
    if (state.nums.length === state.operations.length) {
      newOperations[newOperations.length - 1] = operation;
    }
    else {
      calcPreviousOperations(operation);
      newOperations.push(operation);
    }
    return {
      ...state,
      operations: newOperations
    }
  }

  function addNumber(addedNum: string) {
    const newNums = state.nums.slice();
    if (state.operations.length === state.nums.length) {
      newNums.push(addedNum);
    }
    else {
      const [num, i] = getLastValAndIndxFromArr<string>(state.nums);
      newNums[i] = num === "0" ? addedNum : `${num}${addedNum}`;
    }
    return {
      ...state,
      nums: newNums
    }
  }

  function calcPercent() {
    const [prevOperation] = getLastValAndIndxFromArr<string>(state.operations);
    const [num, i] = getLastValAndIndxFromArr<string>(state.nums);
    const prevNum = state.nums[i - 1];
    let percent = prevOperation === "+" || prevOperation === "-" ? Number(num) * Number(prevNum) / 100 : Number(num) / 100;
    const newNums = state.nums.slice();
    newNums[i] = percent.toString();
    return {
      ...state,
      nums: newNums
    }
  }

  function calcPreviousOperations(newOperation: MathOperations) {
    const [previousOperation] = getLastValAndIndxFromArr<string>(state.operations);
    if (!previousOperation) return;
    if (newOperation === "+" || newOperation === "-") {
      performOperations(["*", "/", "+", "-"]);
    }
    else if (previousOperation === "*" || previousOperation === "/") {
      performOperations(["*", "/"]);
    }
  }

  function calc(num1: number, num2: number, operation: MathOperations) {
    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  }

}

export default calculatorReducer;