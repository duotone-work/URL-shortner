import styles from "./Button.module.css";

const Button = ({
  btnText,
  onClickAction,
  disabled = false,
}: {
  btnText: string;
  onClickAction: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={styles.default_button}
      disabled={disabled}
      onClick={onClickAction}
    >
      <div className={styles.button_innard}>
        <div className={styles.button_circle}></div>
        <div className={styles.button_circle}></div>
        <div className={styles.button_circle}></div>
        <div className={styles.button_circle}></div>
      </div>
      {btnText}
    </button>
  );
};

export default Button;
