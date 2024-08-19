import containerStyles from '../textField/textField.module.scss'
import React from 'react'

type SelectProps = {
  label?: string
  placeholder: string
  className?: string
  helperText?: string
  error?: boolean
  name: string
  options: { value: string; title: string }[]
  /* eslint-disable-next-line no-unused-vars */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Select({
  label,
  placeholder,
  name,
  className = '',
  helperText,
  error,
  options,
  onChange
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
  )
}
