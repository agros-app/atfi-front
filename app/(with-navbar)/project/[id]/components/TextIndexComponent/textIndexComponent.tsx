import styles from './textIndexComponent.module.scss'

type textIndexComponentProps = {
  text: string
  percentage?: string
  subtext?: string
  variant?: 'primary' | 'secondary'
}

export default function TextIndexComponent({
  text,
  percentage,
  subtext,
  variant = 'primary'
}: textIndexComponentProps) {
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.text}>{text} </span>
        {variant === 'primary' && percentage && (
          <span className={styles.percentage}>({percentage}%)</span>
        )}
        {variant === 'secondary' && percentage && (
          <span className={styles.secondary}>{percentage}</span>
        )}
      </div>
      {subtext && <div className={styles.subtext}>{subtext}</div>}
    </div>
  )
}
