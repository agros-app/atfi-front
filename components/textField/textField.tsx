import styles from "./textField.module.scss";

type TextFieldProps = {
  placeholder: string;
  name: string;
  className?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
};

export default function TextField({
  placeholder,
  name,
  className,
  label,
  helperText,
  error,
}: TextFieldProps) {
  return (
    <div className={`${styles.container} ${error ? styles.error : ""}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input type="text" placeholder={placeholder} name={name} id={name} />
      {helperText && <small className={styles.helperText}>{helperText}</small>}
    </div>
  );
}
