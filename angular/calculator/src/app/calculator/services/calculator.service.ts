import { MathOperations } from "../models/calculator.models";


export class CalculatorService {
  
  nums: string[] = ["0"];
  operations: MathOperations[] = [];

  handleEvent(event: string) {
    switch (event) {
      case "reset":
        return this.reset();
      case "-/+":
        return this.togglePosNegNum();
      case ".":
        return this.addDot();
      case "%":
        return this.calcPercent();
      case "=":
        return this.calcAll();
      case "+":
      case "-":
      case "*":
      case "/":
        return this.addOperation(event);
      default:
        return this.addNumber(event);
    }
  }

  reset() {
    this.nums.length = this.operations.length = 0;
    this.nums[0] = "0";
  }

  addDot() {
    const [num, i] = this.getLastValAndIndxFromArr<string>(this.nums);
    this.nums[i] = num.includes(".") ? num : `${num}.`;
  }

  calcAll() {
    if (this.nums.length < 2) return;
    this.performOperations(["*", "/", "+", "-"]);
  }

  togglePosNegNum() {
    const [num, i] = this.getLastValAndIndxFromArr<string>(this.nums);
    this.nums[i] = this.toggleNegativeNum(num);
  }

  addOperation(operation: MathOperations) {
    if (this.nums.length === this.operations.length) {
      this.operations[this.operations.length - 1] = operation;
    }
    else {
      this.calcPreviousOperations(operation);
      this.operations.push(operation);
    }
  }

  addNumber(addedNum: string) {
    if (this.operations.length === this.nums.length) {
      this.nums.push(addedNum);
    }
    else {
      const [num, i] = this.getLastValAndIndxFromArr<string>(this.nums);
      this.nums[i] = num === "0" ? addedNum : `${num}${addedNum}`;
    }
  }

  calcPercent() {
    const [prevOperation] = this.getLastValAndIndxFromArr<string>(this.operations);
    const [num, i] = this.getLastValAndIndxFromArr<string>(this.nums);
    const prevNum = this.nums[i - 1];
    let percent = prevOperation === "+" || prevOperation === "-" ? Number(num) * Number(prevNum) / 100 : Number(num) / 100;
    this.nums[i] = percent.toString();
  }


  calcPreviousOperations(newOperation: MathOperations) {
    const [previousOperation] = this.getLastValAndIndxFromArr<string>(this.operations);
    if (!previousOperation) return;
    if (newOperation === "+" || newOperation === "-") {
      this.performOperations(["*", "/", "+", "-"]);
    }
    else if (previousOperation === "*" || previousOperation === "/") {
      this.performOperations(["*", "/"]);
    }
  }

  performOperations(operationsToPerform: MathOperations[]) {
    if (operationsToPerform.length <= 0) return;
    const operation = operationsToPerform[0];
    let indx = this.operations.indexOf(operation);
    while (indx >= 0) {
      const n1 = Number(this.nums[indx]),
            n2 = Number(this.nums[indx + 1]),
            sum = this.calc(n1, n2, operation);
      this.operations.splice(indx, 1);
      this.nums.splice(indx, 2, sum.toString());
      indx = this.operations.indexOf(operation);
    }
    this.performOperations(operationsToPerform.slice(1)); 
  }

  calc(num1: number, num2: number, operation: MathOperations) {
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

  toggleNegativeNum(num: string) {
    if (num === "0") return "0";
    return num[0] === "-" ? num.slice(1) : `-${num}`;
  }

  getLastValAndIndxFromArr<T>(arr: T[]): [T, number] {
    const indx = arr.length - 1;
    const val = arr[indx];
    return [val, indx];
  }
}