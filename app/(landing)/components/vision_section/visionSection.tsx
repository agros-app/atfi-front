"use client";
import { motion } from "framer-motion";
import styles from "./visionSection.module.scss";

const animationStyles = {
  container: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  title: {
    initial: { y: -50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  description: {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  cardsContainer: {
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  card: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  }
};

export default function VisionSection() {
  return (
      <motion.section className={styles.container} {...animationStyles.container}>
       {/*  <motion.h2 className={styles.title} {...animationStyles.title}>
          Lo mejor de ambos mundos
        </motion.h2>
        <motion.p className={styles.description} {...animationStyles.description}>
          Somos un equipo de jóvenes emprendedores apasionados por la tecnología y
          las finanzas. Nuestra misión es brindar soluciones innovadoras para que
          puedas invertir de forma segura y sencilla.
        </motion.p> */}
        <motion.div className={styles.cardsContainer} {...animationStyles.cardsContainer}>
          <motion.div className={styles.vision} {...animationStyles.card}>
            <div className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>
              Nuestra <br /> visión
            </h3>
            <p className={styles.cardDescription}>
              Ser el nexo entre tecnología, sector agropecuario y sector financiero mas importante del mundo.
            </p>
          </motion.div>
          <motion.div className={styles.mission} {...animationStyles.card}>
            <div className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>
              Nuestra <br /> misión
            </h3>
            <p className={styles.cardDescription}>
              Ofrecer productos y servicios financieros confiables y accesibles a
              los actores agropecuarios, a través de tecnologías blockchain.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
  );
}
