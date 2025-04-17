

// Componente Select
export const Select = ({ options, classes, onChange, value, disabled }) => {
  return (
    <select
      className={`${classes}`}
      onChange={onChange}
      value={value}
      disabled={disabled}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Valor predeterminado para las propiedades opcionales
Select.defaultProps = {
  classes: "",
  onChange: () => {},
  value: "",
  disabled: false,
};
