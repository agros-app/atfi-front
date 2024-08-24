"use client"
import React, { useRef } from "react";
import styles from "./description.module.scss";

type DescriptionFieldProps = {
    placeholder: string;
    name: string;
    className?: string;
    label?: string;
    helperText?: string;
    error?: boolean;
    rows?: number;
    value? : string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function DescriptionField({
                                             placeholder,
                                             name,
                                             className,
                                             label,
                                             value,
                                             helperText,
                                             error,
                                             rows = 4, // Valor por defecto
                                             onChange,
                                             ...inputProps
                                         }: DescriptionFieldProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Restablece la altura
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta la altura según el contenido
        }

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`${styles.container} ${error ? styles.error : ""}`}>
            {label && (
                <label className={styles.label} htmlFor={name}>
                    {label}
                </label>
            )}
            <textarea
                ref={textareaRef}
                className={`${styles.inputStyle} ${className}`}
                onChange={handleInputChange}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                rows={rows}
                {...inputProps}
            />
            {helperText && <small className={styles.helperText}>{helperText}</small>}
        </div>
    );
}