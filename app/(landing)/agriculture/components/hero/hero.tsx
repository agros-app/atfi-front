import styles from "./hero.module.scss";

export default function Hero() {
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.tag}>AGRICULTORES</p>
                <h1 className={styles.heading}>
                    Digitalizá tu campaña agricola.
                    Elegí tu transformacion con
                    <span> Atfi.</span>
                </h1>
            </div>
            <div className={styles.imageContainer}>
                <img
                    alt={"Hero image"}
                    className={styles.image}
                    src="/agriculture/hero2.jpg"
                />
                <img
                    alt={"Second Hero image"}
                    className={styles.secondImage}
                    src="/agriculture/hero.jpg"
                />
            </div>
        </div>
    );
}
