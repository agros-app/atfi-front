"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./featureSection.module.scss";
import { useEffect, useRef } from "react";
import {
  containerVariants,
  itemVariants,
  visionBorderVariants,
  visionContainerVariants,
} from "./variants";

const featureList = [
  {
    title: "Transparencia",
    description:
      "ATFI visualiza un futuro con una financiación agrícola accesible y clara. La transparencia y la trazabilidad son fundamentales para nosotros, por lo que proporcionamos actualizaciones periódicas y detalladas sobre el progreso de cada proyecto.",
  },
  {
    title: "Retornos competitivos",
    description:
      "Ofrece retornos competitivos y transparentes a los inversores. Desde el momento en que realizas tu inversión, puedes seguir el progreso de la inversion a través de nuestra plataforma con informacion en tiempo real.",
  },
  {
    title: "Innovación tecnológica",
    description:
      " Lidera la integración de criptomonedas en modelos de financiación tradicionales. Mediante la adopción de tecnologías innovadoras, ATFI busca derribar barreras y empoderar a las personas para que participen en la economía agrícola como nunca antes.",
  },
  {
    title: "Oportunidades",
    description:
      "Facilita el acceso de los agricultores a mercados globales, mejorando sus oportunidades de venta. Brinda a los agricultores la posibilidad de acceder a financiación a tasas competitivas, lo que les permite expandir sus operaciones y aumentar su producción.",
  },
];

export default function FeatureSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={styles.container}
      id="features"
    >
      <motion.p
        ref={ref}
        variants={itemVariants}
        className={styles.description}
      >
        Descubrí una forma sencilla y efectiva de hacer crecer tus finanzas. Te
        guiamos a través de cada paso para que puedas invertir con confianza y
        obtener los mejores resultados.
      </motion.p>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={visionBorderVariants}
        className={styles.visionBorder}
      />
      <motion.div
        initial="hidden"
        animate={controls}
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
    </motion.section>
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
