import styles from "./hero.module.scss";
import HeroImage from "@/app/(landing)/investor/agriculture/components/hero_image/hero_image";
import Button from "@/components/button/button";

export default function Hero() {
    return (
        <div className={styles.container}>
            <div className={styles.screenDivision} >
                <div className={styles.leftHandSide}>
                    <div>
                        <p className={styles.tag}>INVERSORES</p>
                        <h1 className={styles.heading}>
                            Financiá y participá en proyectos agro
                            <span> innovadores</span>
                        </h1>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, ut labore et. Dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <div className={styles.buttonContainer}>
                            <Button className={styles.button}>Invertir</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <HeroImage />
                </div>
            </div>
        </div>
    );
}