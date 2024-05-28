import styles from './projectCard.module.scss';
import image from '@/assets/icons/farm-image.png';
import Button from "@/components/button/button";

export default function ProjectCard(){
    return (
        <div className={styles.container}>
            <div className={styles.leftHandSide}>
                <img src={image.src} alt="Farm Image" className={styles.image} ></img>
            </div>
            <div className={styles.rightHandSide}>
                <p className={styles.title}>Villa Verde</p>
                <div className={styles.about}>
                    <div className={styles.dataLeftHandSide}>
                        <p className={styles.dataType}>Tipo de cosecha</p>
                        <p className={styles.dataType}>Ubicación</p>
                        <p className={styles.dataType}>Finaliza en</p>

                    </div>
                    <div className={styles.dataRightHandSide}>
                        <p className={styles.dataAmount}>Soja</p>
                        <p className={styles.dataAmount}>Argentina</p>
                        <p className={styles.dataAmount}>2 días</p>
                    </div>
                </div>
                <p className={styles.collected}>Recaudado: $500.000</p>
                <div className={styles.progressBarOutside} />
                <div className={styles.about}>
                    <div className={styles.dataLeftHandSide}>
                        <p className={styles.percentage}>50%</p>
                    </div>
                    <div className={styles.dataRightHandSide}>
                        <p className={styles.expected}>Meta: $500.000</p>
                    </div>
                </div>
                <div className={styles.about}>
                    <div className={styles.dataLeftHandSide}>
                        <Button variant="outlined" size={"md"}>Detalles</Button>
                    </div>
                    <div className={styles.dataRightHandSide}>
                        <Button variant="primary" size={"md"}>Invertir</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}