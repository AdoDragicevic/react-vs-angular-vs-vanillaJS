import css from "./Screen.module.css";

const Screen = ({ value }: { value: string }) => {
  return (
    <div className={css.screen}>
      <div className={css['welcome-msg']}>Hello Math!</div>
      <div className={css.value}>{value}</div>
    </div>
  )
}

export default Screen;