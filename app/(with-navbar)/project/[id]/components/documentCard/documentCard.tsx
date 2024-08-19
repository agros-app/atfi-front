import styles from './documentCard.module.scss'

type DocumentCardProps = {
  title: string
  description: string
}
export default function DocumentCard({
  title,
  description
}: DocumentCardProps) {
  return (
    <div className={styles.documentCard}>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.iconContainer}>
        <img src={'/download_icon.png'} alt={'Download Icon'} />
      </div>
    </div>
  )
}
