import LeafIcon from "@/assets/icons/leaf";
import styles from "./landingCard.module.scss";

type LandingCardProps = {
    title: string;
    description: string;
    icon: string;
    image: string;
    reverse?: boolean;
};

export default function LandingCard({ title, description, icon, image, reverse }: LandingCardProps) {
    return (
        <div style={{flexDirection: reverse ? 'row-reverse' : 'row'}} className={styles.cardContainer}>
            <div className={styles.imageWrapper}>
                <img className={styles.backgroundImage} src={image} alt="background" />
            </div>
            <div className={styles.textWrapper}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}

