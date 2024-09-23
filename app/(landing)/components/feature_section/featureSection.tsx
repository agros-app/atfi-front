"use client";

import { motion } from "framer-motion";
import styles from "./featureSection.module.scss";
import {
  // containerVariants,
  itemVariants,
  visionBorderVariants,
  visionContainerVariants,
} from "./variants";

const featureList = [
  {
    title: "Transparencia y Trazabilidad",
    description:
      "Blockchain no es un capricho. No lo utilizamos para tokenizar, sino que es una herramienta que nos permite automatizar, trazar y mostrar tanto el camino del dinero como los datos de una manera segura y transparente a todos los agentes involucrados",
  },
  {
    title: "Diversificación",
    description:
      "podes acceder a la inversión en activos biológicos, lo cual es una manera de diversificar tu cartera. A través de nuestra plataforma podrás ver la evolución del cultivo a lo largo del tiempo. ",
  },
  {
    title: "Innovación tecnológica",
    description:
      "Lidera la integración de blockchain en modelos de financiación tradiconales, mediante la adopción de tecnologías innovadoras. AGRAS busca derribar barreras geográficas y dar una opción de acceso al sector.",
  },
];

export default function FeatureSection() {
  return (
    <section className={styles.container} id="features">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
        className={styles.description}
      >
      Agras es una plataforma digital que te permite acceder a los rendimientos del sector agropecuario asociándote a una campaña productiva.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={visionBorderVariants}
        className={styles.visionBorder}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={visionContainerVariants}
        className={styles.visionContainer}
      >
        {featureList.map((item, index) => (
          <Feature
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </motion.div>
    </section>
  );
}

const Feature = ({ title, description }: any) => (
  <motion.div className={styles.feature}>
    <h2 className={styles.featureTitle}>{title}</h2>
    <p className={styles.featureDescription}>{description}</p>
  </motion.div>
);
