import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import styles from "./Input.module.css";

const Input = ({
  setLink,
  link,
}: {
  setLink: Dispatch<SetStateAction<string>>;
  link: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <input
      type="url"
      className={styles.url_input}
      placeholder="Paste your link"
      value={link}
      onChange={(e) => {
        setLink(e.target.value);
      }}
      ref={inputRef}
    />
  );
};

export default Input;
