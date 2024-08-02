"use client";
import Image from "next/image";
import styles from "./projectCard.module.scss";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import LocationIcon from "@/assets/icons/location";
import TimeIcon from "@/assets/icons/time";
import SeedIcon from "@/assets/icons/seed";
import ProgressBar from "../progressBar/progressBar";
import { Project } from "@/types";
import { differenceInCalendarDays, startOfToday } from "date-fns";

type ProjectCardProps = {
  project: Project;
};
// TODO: integrate with real data
// Params: photoURL, roi, name, location, startDate, endDate, seeds, actual, goal
// TODO: BACKEND SHOULD RETURN ADRESS INSTEAD OF ADRESS ID
export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const daysLeft = differenceInCalendarDays(
    new Date(project.endDate),
    startOfToday()
  );
  const percentage = Math.floor(
    (project.amountCollected / project.amountNeed) * 100
  );
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
      </div>
      <div className={styles.bottom}>
        <div className={styles.roi}>400% (ROI)</div>
        <div className={styles.info}>
          <h3>{project.name}</h3>
          <div className={styles.description}>
            <div className={styles.specific}>
              <LocationIcon />
              <span>Argentina</span>
            </div>
            <div className={styles.specific}>
              <TimeIcon />
              <span>{daysLeft} días restantes</span>
            </div>
            <div className={styles.specific}>
              <SeedIcon />
              <span>{project.seeds.join(", ")}</span>
            </div>
          </div>
        </div>
        <div className={styles.financial}>
          <div className={styles.goal}>
            <div>
              <span className={styles.label}>Actual</span>
              <span className={styles.value}>${project.amountCollected}</span>
            </div>
            <div>
              <span className={styles.label}>Meta</span>
              <span className={styles.value}>${project.amountNeed}</span>
            </div>
          </div>
          <div className={styles.progress}>
            <span>{percentage}%</span>
            <ProgressBar
              collected={project.amountCollected}
              goal={project.amountNeed}
            />
          </div>
        </div>
        <Button size="sm" onClick={() => router.push(`/project/${project.id}`)}>
          Invertir
        </Button>
      </div>
    </div>
  );
}
