import styles from "./textField.module.scss";
import React from "react";

type TextFieldProps = {
  placeholder: string;
  name: string;
  className?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  type?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function TextField({
                                    placeholder,
                                    name,
                                    className,
                                    label,
                                    helperText,
                                    error,
                                    type = "text",
                                    onChange,
                                    rows,
                                    value,
                                    ...inputProps
                                  }: TextFieldProps) {
  return (
      <div className={`${styles.container} ${error ? styles.error : ""}`}>
        {label && (
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>
        )}
        {rows ? (
            <textarea
                className={className}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={name}
                rows={rows}
            />
        ) : (
            <input
                className={className}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                {...inputProps}
            />
        )}
        {helperText && <small className={styles.helperText}>{helperText}</small>}
      </div>
  );
}
