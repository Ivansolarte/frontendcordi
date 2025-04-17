export const Input = ({
  type,
  value,
  onChange,
  classes,
  placeholder,
  disabled,
  title,
  name,
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
        className={`border border-sky-600 border-2 w-full p-2 rounded-lg  ${classes}`}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
    </>
  );
};

Input.defaultProps = {
  name: "",
  type: "text",
  value: "",
  onChange: () => {},
  classes: "",
  placeholder: "",
  disabled: false,
};
