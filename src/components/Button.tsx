import type { RefObject } from "react";
import styles from "./Button.module.css";

const Button = ({
  btnText,
  onClickAction,
  disabled = false,
  ref,
}: {
  btnText: string;
  onClickAction: () => void;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <button
      className={styles.default_button}
      disabled={disabled}
      onClick={onClickAction}
      ref={ref}
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
