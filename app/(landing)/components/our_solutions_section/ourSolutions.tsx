import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./ourSolutions.module.scss";
import Image from "next/image";
import Button from "@/components/button/button";
import { Project } from "@/types";

const project1:Project = {
  id: 1,
  name: "Cultivo de soja",
  amountNeed: 50000,
  amountCollected: 10000,
  minAmount: 500,
  startDate: "2024-08-01T00:00:00.000Z",
  endDate: "2024-12-31T00:00:00.000Z",
  status: "APPROVED",
  addressId: 1,
  description: "Proyecto para el cultivo de soja en campos de Uruguay",
  seeds: ["soja"],
};

const project2: Project = {
  id: 2,
  name: "Plantación de maíz",
  amountNeed: 60000,
  amountCollected: 20000,
  minAmount: 600,
  startDate: "2024-07-01T00:00:00.000Z",
  endDate: "2025-01-25T00:00:00.000Z",
  status: "APPROVED",
  addressId: 2,
  description:
    "Iniciativa para la plantación de maíz en la región este de Uruguay",
  seeds: ["maíz"],
};

export default function OurSolutionsSection() {
  return (
    <>
      <section className={styles.container} id="our-solutions">
        <div className={styles.textContainer}>
          <h2>
            Financia y participa de proyectos <span>agro</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor, ut labore et dolore magna aliqua. Lorem ipsum dolor
            sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor, ut labore et. Dolor sit
            amet, consectetur adipiscing elit
          </p>
        </div>
        <div className={styles.cardsContainer}>
          <ProjectCard project={project1} />
          <ProjectCard project={project2} />
        </div>
      </section>
      <section className={styles.container2}>
        <div className={styles.imageContainer}>
          <Image
            src={"/landing/cow.jpg"}
            alt="cow"
            sizes="100%"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.textContainer}>
          <h2>
            Sea parte del crecimiento de la <span>ganadería</span> en
            latinoamérica
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor, ut labore et dolore magna aliqua. Lorem ipsum dolor
            sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor, ut labore et. Dolor sit
            amet, consectetur adipiscing elit
          </p>
          <Button disabled variant="custom" className={styles.button}>
            Proximamente
          </Button>
        </div>
      </section>
    </>
  );
}
