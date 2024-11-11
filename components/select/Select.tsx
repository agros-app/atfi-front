import containerStyles from '../textField/textField.module.scss'
import React from 'react'

type SelectProps = {
  label?: string
  placeholder?: string
  className?: string
  helperText?: string
  error?: boolean
  name: string
  selected?: string
  options: { value: string; title: string }[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export default function Select({
  label,
  placeholder,
  name,
  className = '',
  helperText,
  error,
  options,
  selected = '',
  onChange,
  required = false
}: SelectProps) {
  return (
    <div
      onChange={onChange}
      className={`${containerStyles.container} ${
        error ? containerStyles.error : ''
      }`}
    >
      {label && (
        <label className={containerStyles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <select name={name} className={className} defaultValue={selected} required={required}>
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
  )
}
