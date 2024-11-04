import ArrowDown from '@/assets/icons/arrowDown'
import styles from './stock.module.scss'

export interface StockProps {
  icon: React.ComponentType
  title: string
  variation: number
  price: number
}

export default function Stock({
  icon: Icon,
  title,
  variation,
  price
}: StockProps) {
  const backgroundColor = (): string => {
    switch (title) {
      case 'Soja':
        return '#00671c'
      case 'Maíz':
        return '#938213'
      case 'Trigo':
        return '#757a43'
      default:
        return '#000'
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.titleContainer}
          style={{ backgroundColor: backgroundColor() }}
        >
          <Icon />
          <h4>{title}</h4>
        </div>
        <div
          className={`${styles.variation} ${
            variation >= 0 ? styles.up : styles.down
          }`}
        >
          {`${variation ?? 'N/A'}%`}
          <ArrowDown />
        </div>
      </div>
      <p className={styles.cost}>${price}/t</p>
    </div>
  )
}
