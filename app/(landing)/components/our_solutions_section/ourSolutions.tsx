"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./ourSolutions.module.scss";
import Image from "next/image";
import Button from "@/components/button/button";
import {Project, ProjectData} from "@/types/api";
import cowImage from "@assets/images/cow.webp"

const animationStyles = {
  container: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  textContainerLeft: {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  cardsContainer: {
    initial: { y: 100, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  imageContainer: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  },
  textContainerRight: {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1 },
  }
};

const defaultProject: ProjectData = {
  id: 1,
  cost:{
    commercializationExpenses: 171.11111111111111,
    plowing: 77,
    seeds: 63,
    agrochemicalsFertilizers: 220,
    harvest: 79,
    lease: 295.8
  },
  name: "Cultivo de Soja en Córdoba",
  amountNeed: 100000,
  amountCollected: 30000,
  minAmount: 1000,
  startDate: "2024-12-12",
  endDate: "2025-12-12",
  startFarming: "2025-12-14",
  endFarming: "2026-12-12",
  returnsDate: "2026-12-12",
  status: "APPROVED",
  addressId: 123,
  description: "Proyecto de cultivo de soja en 50 hectáreas con prácticas agrícolas sostenibles.",
    providers: [
    { 
      name: "AgroSistemas", 
      seed: "soja" ,
      id: 1,
      userId: 1
    },
    { 
      name: "BioTec", 
      seed: "maíz",
      id: 2,
      userId: 2
    },
    ],

  country: "Argentina",
  city: "Córdoba",
  zipCode: "5000",
  state: "Córdoba",
  area: 50, // Hectáreas
  latitude: "-31.4201",
  longitude: "-64.1888"
}

export default function OurSolutionsSection() {
  const handleRedirect = () => {
    window.location.href = "/investor/agriculture";
  };
  return (
      <>
        <motion.section
            className={styles.container}
            id="our-solutions"
            {...animationStyles.container}
        >
          <motion.div
              className={styles.textContainer}
              {...animationStyles.textContainerLeft}
          >
            <h2>
              Participa de proyectos <span>agro</span>
            </h2>
            <Button onClick={handleRedirect}>Conocé más</Button>
          </motion.div>
          <motion.div
              className={styles.cardsContainer}
              {...animationStyles.cardsContainer}
          >
            <ProjectCard disabled project={defaultProject}/>
            <ProjectCard disabled project={defaultProject} photo={2}/>
          </motion.div>
        </motion.section>
        <motion.section
            className={styles.container2}
            {...animationStyles.container}
        >
          <motion.div
              className={styles.imageContainer}
              {...animationStyles.imageContainer}
          >
            <Image
                src={cowImage.src}
                alt="cow"
                sizes="100%"
                fill
                style={{ objectFit: "cover" }}
            />
          </motion.div>
          <motion.div
              className={styles.textContainer}
              {...animationStyles.textContainerRight}
          >
            <h2>
              Se parte de la <span>ganadería</span>{" "}
              en latinoamérica
            </h2>
            <Button disabled variant="custom" className={styles.button}>
              Próximamente
            </Button>
          </motion.div>
        </motion.section>
      </>
  );
}
