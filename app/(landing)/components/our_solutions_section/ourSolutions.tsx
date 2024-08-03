"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./ourSolutions.module.scss";
import Image from "next/image";
import Button from "@/components/button/button";

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

export default function OurSolutionsSection() {
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
              Financia y participa de proyectos <span>agro</span>
            </h2>
            <Button>Conocé más</Button>
          </motion.div>
          <motion.div
              className={styles.cardsContainer}
              {...animationStyles.cardsContainer}
          >
            <div className={styles.topCard}>
              <ProjectCard />
            </div>
            <ProjectCard />
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
                src={"/landing/cow.jpg"}
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
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor, ut labore et dolore magna aliqua. Lorem ipsum dolor
              sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor, ut labore et. Dolor sit
              amet, consectetur adipiscing elit
            </p> */}
            <Button disabled variant="custom" className={styles.button}>
              Proximamente
            </Button>
          </motion.div>
        </motion.section>
      </>
  );
}
