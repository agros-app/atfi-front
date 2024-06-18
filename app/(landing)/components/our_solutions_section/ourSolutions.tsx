import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./ourSolutions.module.scss";
import Image from "next/image";
import Button from "@/components/button/button";

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
          <div className={styles.topCard}>
            <ProjectCard />
          </div>
          <ProjectCard />
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
            Sea parte del crecimiento de la <span>ganadería</span>{" "}
            en latinoamérica
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor, ut labore et dolore magna aliqua. Lorem ipsum dolor
            sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor, ut labore et. Dolor sit
            amet, consectetur adipiscing elit
          </p>
          <Button disabled variant="custom" className={styles.button}>Proximamente</Button>
        </div>
      </section>
    </>
  );
}
