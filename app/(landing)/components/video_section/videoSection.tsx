'use client'
import { motion } from 'framer-motion'
import styles from './video.module.scss'
import Button from '@/components/button/button'

export default function VideoSection() {
  return (
    <section className={styles.container} id="video">
      <video className={styles.backgroundVideo} autoPlay loop muted>
        <source src="/landing/landing-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.contentContainer}>
        <motion.h1
          className={styles.titleP2}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          El agro
        </motion.h1>
        <motion.h1
          className={styles.titleP1}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          ahora es una opción
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.5 }}
        >
          Participa de una campaña productiva, y accede a los rendimientos del
          sector agropecuario
        </motion.p>
        <motion.div
          className={styles.button}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          <Button size="lg">Conocer más</Button>
        </motion.div>
      </div>
    </section>
  )
}
