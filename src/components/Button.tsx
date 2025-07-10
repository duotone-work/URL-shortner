const Button = ({
  btnText,
  disabled = false,
}: {
  btnText: string;
  disabled?: boolean;
}) => {
  return (
    <button className="default_button" disabled={disabled}>
      <div className="button_innard">
        <div className="button_circle"></div>
        <div className="button_circle"></div>
        <div className="button_circle"></div>
        <div className="button_circle"></div>
      </div>
      {btnText}
    </button>
  );
};

export default Button;
