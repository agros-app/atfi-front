"use client";
import Image from "next/image";
import styles from "./projectCard.module.scss";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import LocationIcon from "@/assets/icons/location";
import TimeIcon from "@/assets/icons/time";
import SeedIcon from "@/assets/icons/seed";
import ProgressBar from "../progressBar/progressBar";

// TODO: integrate with real data
// Params: photoURL, roi, name, location, startDate, endDate, seeds, actual, goal
export default function ProjectCard() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Image
          src={"/farm-image.png"}
          alt="Farm Image"
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="100%"
        />
        <div className={styles.roi}>400% (ROI)</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          <h3>Valle verde</h3>
          <div className={styles.description}>
            <div className={styles.specific}>
              <LocationIcon />
              <span>Argentina</span>
            </div>
            <div className={styles.specific}>
              <TimeIcon />
              <span>20 días</span>
            </div>
            <div className={styles.specific}>
              <SeedIcon />
              <span>Trigo, maíz, soja</span>
            </div>
          </div>
        </div>
        <div className={styles.financial}>
          <div className={styles.goal}>
            <div>
              <span className={styles.label}>Actual</span>
              <span className={styles.value}>$500.000</span>
            </div>
            <div>
              <span className={styles.label}>Meta</span>
              <span className={styles.value}>$1.000.000</span>
            </div>
          </div>
          <div className={styles.progress}>
            <span>50%</span>
            <ProgressBar collected={500000} goal={1000000} />
          </div>
        </div>
        <Button size="sm" onClick={() => router.push("/project/1")}>
          Invertir
        </Button>
      </div>
    </div>
  );
}
