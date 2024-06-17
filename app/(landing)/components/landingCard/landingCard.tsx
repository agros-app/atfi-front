import styles from "./landingCard.module.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { itemVariants } from "./variants";

export type LandingCardProps = {
  title: string;
  description: string;
  icon: string;
  image: string;
  reverse?: boolean;
};

export default function LandingCard({
  title,
  description,
  icon,
  image,
  reverse,
}: LandingCardProps) {
  const cardControls = useAnimation();
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef);

  useEffect(() => {
    if (cardInView) {
      cardControls.start("visible");
    }
  }, [cardControls, cardInView]);
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardControls}
      variants={itemVariants}
      style={{ flexDirection: reverse ? "row-reverse" : "row" }}
      className={styles.cardContainer}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.backgroundImage} src={image} alt="background" />
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  );
}
