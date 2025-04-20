// Componente Select
export const Select = ({
  options,
  classes,
  onChange,
  value,
  disabled,
  title,
  name,
}) => {
  return (
    <div>
      {title && (
        <label className="block text-md font-medium font-coordi text-gray-900 ml-1 uppercase">
          {title}
        </label>
      )}
      <select
        name={name}
        className={`border border-sky-600 border-2 w-full p-2 py-3 rounded-lg  focus:outline-none focus:border-primary focus:text-black ${classes}`}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        <option value="o">Selecciona un tipo</option>
        {options.map((option, index) => (
          <option className="border rounded-lg" key={index} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Valor predeterminado para las propiedades opcionales
Select.defaultProps = {
  name: "",
  classes: "",
  onChange: () => {},
  value: "",
  disabled: false,
};
