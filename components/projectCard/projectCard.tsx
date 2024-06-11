"use client";
import Image from "next/image";
import styles from "./projectCard.module.scss";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";

export default function ProjectCard() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.leftHandSide}>
        <Image
          src={"/farm-image.png"}
          alt="Farm Image"
          fill
          priority
          sizes="100%"
        />
      </div>
      <div className={styles.rightHandSide}>
        <p className={styles.title}>Villa Verde</p>

        <ul className={styles.leaders}>
          <li>
            <span>Tipo de cosecha</span>
            <span>Soja</span>
          </li>
          <li>
            <span>Ubicación</span>
            <span>Argentina</span>
          </li>
          <li>
            <span>Finaliza en</span>
            <span>2 días</span>
          </li>
        </ul>

        <p className={styles.collected}>Recaudado: $500.000</p>
        <div className={styles.progressBarOutside}>
          <div className={styles.progressBarInside} />
        </div>
        <div className={styles.goal}>
          <div className={styles.goalLeftHandSide}>
            <p className={styles.percentage}>50%</p>
          </div>
          <div className={styles.goalRightHandSide}>
            <p className={styles.expected}>Meta: $500.000</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            size="sm"
            fill
            onClick={() => router.push("/project/1")}
          >
            Detalles
          </Button>
        </div>
      </div>
    </div>
  );
}