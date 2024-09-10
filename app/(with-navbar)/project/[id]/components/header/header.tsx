import Image from "next/image";
import styles from "./header.module.scss";
import projectBackgroundImage from "@assets/images/project/project_background.webp"

export default function Header({name, country}: {name: string ,country: string}) {
    return (
      <div className={styles.header}>
          <Image className={styles.image} src={projectBackgroundImage.src} width={projectBackgroundImage.width} height={projectBackgroundImage.height} alt="Farm Image" />
          <div className={styles.textInTitle}>
              <p className={styles.title}>{name}</p>
              <p className={styles.subtitle}>{country}</p>
          </div>
      </div>
    );
  }