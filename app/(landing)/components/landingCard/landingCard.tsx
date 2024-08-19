import styles from './landingCard.module.scss'
import { motion } from 'framer-motion'
import { itemVariants } from './variants'

export type LandingCardProps = {
  title: string
  description: string
  icon: string
  image: string
  reverse?: boolean
}

export default function LandingCard({
  title,
  description,
  icon,
  image,
  reverse
}: LandingCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
      className={`${styles.cardContainer} ${reverse ? styles.reverse : styles.row}`}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.backgroundImage} src={image} alt="background" />
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  )
}
