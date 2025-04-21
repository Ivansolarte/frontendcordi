export const Input = ({
  type,
  value,
  onChange,
  classes,
  placeholder,
  disabled,
  title,
  name,
  maxLength,
}) => {
  return (
    <>
      {title && (
        <label className="block text-md font-medium font-coordi text-gray-900 ml-1 uppercase">
          {title}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`
          border border-sky-600 border-2 w-full p-2 rounded-lg 
          focus:outline-none focus:border-primary focus:text-black
          ${classes}
        `}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete="off"
      />
    </>
  );
};

Input.defaultProps = {
  name: "",
  maxLength: "",
  type: "text",
  value: "",
  onChange: () => {},
  classes: "",
  placeholder: "",
  disabled: false,
};
