import crawler from '@/assets/Images/tractor.png';
import styles from './landingImage.module.scss';
import Button from "@/components/button/button";

export default function LandingImage() {
    return (
        <section className={styles.container}>
            <div className={styles.imageDataContainer}>
                <h1 className={styles.titleP1}>Impulsando el Futuro de la</h1>
                <h1 className={styles.titleP2}>Agronomía</h1>
                <p className={styles.subtitle}>Financia y participa en proyectos agropecuarios innovadores.</p>
                <div className={styles.button}>
                    <Button  size="lg">Conocer más</Button>
                </div>
            </div>
        </section>
    );
}