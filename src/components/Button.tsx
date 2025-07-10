const Button = ({
  btnText,
  disabled = false,
}: {
  btnText: string;
  disabled?: boolean;
}) => {
  return (
    <button className="default_button" disabled={disabled}>
      {btnText}
    </button>
  );
};

export default Button;
