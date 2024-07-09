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
      "Blockchain no es un capricho. No lo utilizamos para tokenizar, es una herramienta que nos permite trazar y mostrar el camino del dinero y los datos de manera segura y trasparente.",
  },
  {
    title: "Diversificación",
    description:
      "La inversión en activos biologicos es una manera de diversificar tu cartera. Es decir, disminuir el riesgo total de la misma.",
  },
  {
    title: "Innovación tecnológica",
    description:
      "Lidera la integracion de blockchain en modelos de financiacion tradiconales, mediante la adopcion de tecnologias innovadoras. ATFI busca derribar barreras geograficas y dar una opcion de acceso al sector.",
  },
  {
    title: "Seguridad Juridica",
    description:
      "ATFI tiene un compromiso inquebrantable para con su ecosistema de respetar los marcos legales y regulatorios, es por eso que cada proyecto se encuadra bajo una figura de fideicomiso.",
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
      Atfi es una plataforma digital que te permite acceder a los rendimientos del sector agropecuario asociándote a una campaña productiva.
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
    <div className={styles.featureDescription}>
      <p>{description}</p>
    </div>
  </motion.div>
);
