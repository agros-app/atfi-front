import containerStyles from "../textField/textField.module.scss";

type SelectProps = {
  label?: string;
  placeholder: string;
  className?: string;
  helperText?: string;
  error?: boolean;
  name: string;
  options: { value: string; title: string }[];
};

export default function Select({
  label,
  placeholder,
  name,
  className = "",
  helperText,
  error,
  options,
}: SelectProps) {
  return (
    <div
      className={`${containerStyles.container} ${
        error ? containerStyles.error : ""
      }`}
    >
      {label && (
        <label className={containerStyles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <select name={name} className={className}>
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      {helperText && (
        <small className={containerStyles.helperText}>{helperText}</small>
      )}
    </div>
  );
}
