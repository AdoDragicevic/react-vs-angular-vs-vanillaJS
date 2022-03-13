import { useReducer } from "react";
import { CalculatorReducer, CalculatorState } from "../../models/calculator.models";
import { getLastValAndIndxFromArr } from "../../helpers/helpers";
import calculatorReducer from "../../reducers/calculatorReducer";
import css from "./Calculator.module.css";
import Screen from "./Screen";
import Buttons from "./Buttons";

const CALCULATOR_STATE: CalculatorState = { nums: ["0"], operations: [] };


const Calculator = () => {

  const [calc, handleEvt] = useReducer<CalculatorReducer>(calculatorReducer, CALCULATOR_STATE);

  const [ num ] = getLastValAndIndxFromArr<string>(calc.nums);

  return (
    <div className={css.container}>
      <p className={css.title}>CALC</p>
      <Screen value={num} />
      <Buttons onBtnClick={handleEvt} />
    </div>
  )
}

export default Calculator;