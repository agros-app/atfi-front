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
      "Blockchain como medio de pago. Esta herramienta que nos permite trazar y mostrar el camino del dinero y los datos de manera segura y trasparente.",
  },
  {
    title: "Diversificación",
    description:
      "La inversión en activos biológicos es una manera de diversificar tu cartera. Es decir, disminuir el riesgo total de la misma.",
  },
  {
    title: "Innovación tecnológica",
    description:
      "Lidera la integración de blockchain en modelos de financiación tradiconales, mediante la adopción de tecnologías innovadoras. AGRAS busca derribar barreras geográficas y dar una opción de acceso al sector.",
  },
  {
    title: "Seguridad Jurídica",
    description:
      "AGRAS tiene un compromiso inquebrantable para con su ecosistema de respetar los marcos legales y regulatorios, es por eso que cada proyecto se encuadra bajo una figura de fideicomiso.",
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
