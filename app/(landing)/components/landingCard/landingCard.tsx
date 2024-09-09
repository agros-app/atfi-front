import styles from "./landingCard.module.scss";
import { motion } from "framer-motion";
import { itemVariants } from "./variants";
import type { StaticImageData } from "next/image";
import Image from "next/image";

export type LandingCardProps = {
  title: string;
  description: string;
  image: StaticImageData;
  reverse?: boolean;
};

export default function LandingCard({
  title,
  description,
  image,
  reverse,
}: LandingCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
      className={`${styles.cardContainer} ${reverse ? styles.reverse : styles.row}`}
    >
      <div className={styles.imageWrapper}>
        <Image src={image.src} alt="landing card image" width={image.width} height={image.height} className={styles.backgroundImage}/>
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  );
}
