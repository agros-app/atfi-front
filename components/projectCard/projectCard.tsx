"use client";
import Image from "next/image";
import styles from "./projectCard.module.scss";
import Button from "@/components/button/button";
import LocationIcon from "@/assets/icons/location";
import TimeIcon from "@/assets/icons/time";
import SeedIcon from "@/assets/icons/seed";
import ProgressBar from "../progressBar/progressBar";
import {ProjectData} from "@/types/api";
import { getDaysLeft, getPercentage } from "@/utils";
import farmImage from "@assets/images/farm_image.webp"

type ProjectCardProps = {
  project: ProjectData;
  bgColor?: string;
  border?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function ProjectCard({
                                      project,
                                      disabled = false,
                                      bgColor = "fff",
                                      border = "0.5px solid $dark-gray",
                                      onClick,
                                    }: ProjectCardProps) {
  const { id, name, seeds, endDate, amountCollected, amountNeed,city,country } = project;
  const progress = getPercentage(amountCollected, amountNeed);

  return (
      <div
          className={`${styles.container} ${disabled ? styles.disabled : ""}`}
          style={{ backgroundColor: bgColor, border: border }}
          onClick={!disabled ? onClick : undefined}
      >
        <div className={styles.top}>
          <Image
              src={farmImage.src}
              alt="Farm Image"
              fill
              priority
              style={{ objectFit: "cover", filter: 'brightness(0.9)' }}
              sizes="100%"
          />
          <div className={styles.imageOverlay}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.titleDescription}>{`${country}, ${city}`}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <div className={styles.description}>
              <div className={styles.specific}>
                <LocationIcon />
                <span>{country}</span>
              </div>
              <div className={styles.specific}>
                <TimeIcon />
                <span>{getDaysLeft(endDate)} días restantes</span>
              </div>
              <div className={styles.specific}>
                <SeedIcon />
                <span>{seeds.join(", ")}</span>
              </div>
            </div>
          </div>
          <div className={styles.financial}>
            <div className={styles.goal}>
              <div>
                <span className={styles.label}>Actual</span>
                <span className={styles.value}>${amountCollected}</span>
              </div>
              <div>
                <span className={styles.label}>Meta</span>
                <span className={styles.value}>${amountNeed}</span>
              </div>
            </div>
            <div className={styles.progress}>
              <span>{progress}%</span>
              <ProgressBar collected={amountCollected} goal={amountNeed} />
            </div>
          </div>
          <Button
              className={`${disabled === true ? styles.disabled : ""}`}
              size="sm"
          >
            Invertir
          </Button>
        </div>
      </div>
  );
}