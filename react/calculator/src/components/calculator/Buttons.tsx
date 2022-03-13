import { useState, MouseEvent } from "react";
import css from "./Buttons.module.css";

const HIGHLIGHTED_BTNS = {
  "*": false,
  "/": false,
  "+": false,
  "-": false
};

const Buttons = ({ onBtnClick }: { onBtnClick: (operation: string) => void; }) => {

  const [highlightedBtn, setHighlightedBtn] = useState<Record<string, boolean>>(HIGHLIGHTED_BTNS);
  
  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const evt = e.currentTarget.id;
    const newHighlightedBtn = { ...highlightedBtn };
    for (let key in newHighlightedBtn) {
      newHighlightedBtn[key] = key === evt;
    }
    setHighlightedBtn(newHighlightedBtn);
    onBtnClick(evt);
  }
  
  return (
    <div>
      <div className="row">
        <button 
          id="reset"
          className={`${css.btn} ${css['bg-gray']} ${css.black}`} 
          onClick={handleBtnClick}> 
          AC 
        </button>
        <button 
          id="-/+"
          className={`${css.btn} 
          ${css['bg-gray']} ${css.black}`} 
          onClick={handleBtnClick}> 
          <span>+</span>/<span>-</span>
        </button>
        <button 
          id="%"
          className={`${css.btn} ${css["bg-gray"]} ${css.black}`} 
          onClick={handleBtnClick}> 
          % 
        </button>
        <button 
          id="/"
          className={`${css.btn} ${css['bg-orange']} ${highlightedBtn['/'] && css.highlighted}`} 
          onClick={handleBtnClick}> 
          / 
        </button>
      </div>
      <div className="row">
        <button 
          id="7"
          className={`${css.btn} ${css['bg-dark']}`} 
          onClick={handleBtnClick}> 
          7 
        </button>
        <button 
          id="8"
          className={`${css.btn} ${css['bg-dark']}`} 
          onClick={handleBtnClick}> 
          8 
        </button>
        <button 
          id="9"
          className={`${css.btn} ${css['bg-dark']}`} 
          onClick={handleBtnClick}> 
          9 
        </button>
        <button
          id="*" 
          className={`${css.btn} ${css['bg-orange']} ${highlightedBtn['*'] && css.highlighted}`}
          onClick={handleBtnClick}> 
          x 
        </button>
      </div>
      <div className="row">
        <button
          id="4" 
          className={`${css.btn} ${css['bg-dark']}`}
          onClick={handleBtnClick}> 
          4 
        </button>
        <button 
          id="5"
          className={`${css.btn} ${css['bg-dark']}`} 
          onClick={handleBtnClick}> 
          5 
        </button>
        <button 
          id="6"
          className={`${css.btn} ${css['bg-dark']}`} 
          onClick={handleBtnClick}> 
          6 
        </button>
        <button
          id="-" 
          className={`${css.btn} ${css['bg-orange']} ${highlightedBtn['-'] && css.highlighted}`}
          onClick={handleBtnClick}> 
          - 
        </button>
      </div>
    <div className="row">
      <button 
        id="1"
        className={`${css.btn} ${css['bg-dark']}`} 
        onClick={handleBtnClick}> 
        1 
      </button>
      <button 
        id="2"
        className={`${css.btn} ${css['bg-dark']}`} 
        onClick={handleBtnClick}> 
        2 
      </button>
      <button 
        id="3"
        className={`${css.btn} ${css['bg-dark']}`} 
        onClick={handleBtnClick}> 
        3 
      </button>
      <button
        id="+" 
        className={`${css.btn} ${css['bg-orange']} ${highlightedBtn['+'] && css.highlighted}`}
        onClick={handleBtnClick}> 
        + 
      </button>
    </div>
    <div className="row">
      <button 
        id="0"
        className={`${css.btn} ${css['bg-dark']} ${css['btn--wide']}`} 
        onClick={handleBtnClick}> 
        0 
      </button>
      <button 
        id="."
        className={`${css.btn} ${css['bg-dark']}`} 
        onClick={handleBtnClick}> 
        . 
      </button>
      <button
        id="=" 
        className={`${css.btn} ${css['bg-orange']}`} 
        onClick={handleBtnClick}> 
        = 
      </button>
    </div>
  </div>
  )
}

export default Buttons;