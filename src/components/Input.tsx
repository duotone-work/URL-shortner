import type { Dispatch, SetStateAction } from "react";

const Input = ({
  setLink,
  link,
}: {
  setLink: Dispatch<SetStateAction<string>>;
  link: string;
}) => {
  return (
    <input
      className="url_input"
      placeholder="Paste your link"
      value={link}
      onChange={(e) => {
        setLink(e.target.value);
      }}
    />
  );
};

export default Input;
