import React, { useState } from 'react';
import styles from './imageUploadField.module.scss';

type ImageUploadFieldProps = {
    label: string;
    name: string;
    onChange: (file: File | null) => void;
    error?: boolean;
    helperText?: string;
};

const ImageUploadField = ({ label, name, onChange, error, helperText }: ImageUploadFieldProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className={styles.imageUploadField}>
            <label htmlFor={name}>{label}</label>
            <input
                type="file"
                id={name}
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                className={error ? styles.error : ''}
            />
            {preview && <img src={preview} alt="Preview" className={styles.preview} />}
            {helperText && <p className={styles.helperText}>{helperText}</p>}
        </div>
    );
};

export default ImageUploadField;