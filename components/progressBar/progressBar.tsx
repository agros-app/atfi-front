import styles from './progressBar.module.scss'

type ProgressBarProps = {
  collected: number
  goal: number
  height?: number
}
export default function ProgressBar({
  collected,
  goal,
  height
}: ProgressBarProps) {
  const percentage = (collected / goal) * 100

  return (
    <div
      className={styles.progressBarOutside}
      style={{ height: `${height}px` }}
    >
      <div
        className={styles.progressBarInside}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
