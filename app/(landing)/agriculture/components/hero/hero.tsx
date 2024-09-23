import styles from "./hero.module.scss";
import Hero1 from "@assets/images/agriculture/hero1.webp"
import Hero2 from "@assets/images/agriculture/hero2.webp"
import Image from "next/image";
export default function Hero() {
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.tag}>AGRICULTORES</p>
                <h1 className={styles.heading}>
                    Digitalizá tu campaña agricola.
                    Elegí tu transformación con
                    <span> Agras.</span>
                </h1>
            </div>
            <div className={styles.imageContainer}>
                <Image
                    alt={"Hero image"}
                    className={styles.image}
                    src={Hero1.src}
                    width={Hero1.width}
                    height={Hero1.height}
                />
                <Image
                    alt={"Second Hero image"}
                    className={styles.secondImage}
                    src={Hero2.src}
                    width={Hero2.width}
                    height={Hero2.height}
                />
            </div>
        </div>
    );
}
