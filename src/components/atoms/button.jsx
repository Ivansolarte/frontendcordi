export const Button = ({
  text,
  classes,
  onClick,
  disabled,
  type = "primary",
}) => {
  // console.log(type);
  const typeButon= {
    "primary":"bg-primary border-primary hover:bg-primarydark text-white",
    "secondary":"bg-secondary border-secondary hover:bg-secondarydark",
    "cancel":"bg-cancel border-cancel hover:bg-canceldark text-black",
  }
  
  return (
    <button
      className={`border border-2 ${typeButon[type] }   py-2 px-3 rounded-lg w-full uppercase font-semibold ${classes}`}
      onClick={onClick}
      disabled={disabled}
      type={"button"}
    >
      {text}
    </button>
  );
};
