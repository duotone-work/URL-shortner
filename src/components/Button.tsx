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
      className="default_button"
      disabled={disabled}
      onClick={onClickAction}
    >
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
