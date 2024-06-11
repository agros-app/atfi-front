import LeafIcon from "@/assets/icons/leaf";
import styles from "./landingCard.module.scss";

type LandingCardProps = {
  title: string;
  description: string;
};

export default function LandingCard({ title, description }: LandingCardProps) {
  return (
    <section className={styles.landingCard}>
      <div className={styles.data}>
        <LeafIcon className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
