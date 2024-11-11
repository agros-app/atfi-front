import styles from './slider.module.scss'

type SliderProps = {
  name: string
  min: number
  max: number
  className?: string
  label?: string
  error?: boolean
  value?: number
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  required?: boolean
  step?: number
  unit?: string
}

export default function Slider({
  name,
  min,
  max,
  className,
  label,
  error,
  onChange,
  required = false,
  value,
  step = 1,
  unit = '',
  ...inputProps
}: SliderProps) {
  return (
    <div className={`${styles.container} ${error ? styles.error : ''}`}>
      <div className={styles.header}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}

        <div className={styles.value}>
          <span>{value}</span>
          <span> {unit}</span>
        </div>
      </div>
      <input
        className={className}
        onChange={onChange}
        type="range"
        min={min}
        max={max}
        step={step}
        name={name}
        id={name}
        defaultValue={value}
        required={required}
        {...inputProps}
      />
    </div>
  )
}
