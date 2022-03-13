import { Reducer } from "react";


export interface CalculatorState {
  nums: string[];
  operations: string[];
}

export type CalculatorReducer = Reducer<CalculatorState, string>;

export type MathOperations = "+" | "-" | "*" | "/";