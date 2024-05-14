import styles from "./landingCard.module.scss";

type LandingCardProps = {
    icon: string;
    title: string;
    description: string;
}

export default function LandingCard({
    icon,
    title,
    description
    }: LandingCardProps) {
    return (
        <div className={styles.landingCard}>
            <img className={styles.image} src={icon}></img>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
        </div>
    );
}
