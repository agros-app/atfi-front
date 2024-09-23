import styles from "./hero.module.scss";
import HeroImage from "@/app/(landing)/investor/agriculture/components/hero_image/hero_image";
import Button from "@/components/button/button";

export default function Hero() {
    return (
        <div className={styles.container}>
            <div className={styles.screenDivision} >
                <div className={styles.leftHandSide}>
                    <div>
                        <div className={styles.tagContainer}>
                            <p className={styles.tag}>INVERSORES</p>
                        </div>
                        <h1 className={styles.heading}>
                            Participá en proyectos agro
                            <span> innovadores</span>
                        </h1>
                        <p className={styles.text}>
                            Selecciona los proyectos que mejor se adapten a tus objetivos. Con una interfaz intuitiva y fácil de usar, acceder al sector agro nunca fue tan fácil.
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