import styles from './radio.module.scss'

type RadioProps = {
  options: { label: string; value: any; name: string }[] // Array of radio options
  className?: string
  label?: string
  error?: boolean
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export default function Radio({
  options,
  className,
  label,
  error = false,
  onChange,
  value,
  required = false,
  ...inputProps
}: RadioProps) {
  return (
    <div className={`${styles.container} ${error ? styles.error : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.optionsContainer}>
        {options.map((option, id) => (
          <div key={option.value} className={styles.option}>
            <input
              type="radio"
              name={option.name}
              id={`radio-${option.name}-${id}`}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
              className={className}
              {...inputProps}
            />
            <label
              htmlFor={`radio-${option.name}-${id}`}
              className={styles.optionLabel}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
