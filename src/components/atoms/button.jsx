export const Button = ({
  text,
  classes,
  onClick,
  disabled,
  type = "primary",
}) => {
  return (
    <button
      className={`border border-2 border-${type} bg-${type}  py-2 px-3 rounded-lg w-full uppercase font-semibold ${classes}`}
      onClick={onClick}
      disabled={disabled}
      type={"button"}
    >
      {text}
    </button>
  );
};
