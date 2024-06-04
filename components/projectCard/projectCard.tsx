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

                <ul className={styles.leaders}>
                    <li>
                        <span>Tipo de cosecha</span>
                        <span>Soja</span>
                    </li>
                    <li>
                        <span>Ubicación</span>
                        <span>Argentina</span>
                    </li>
                    <li>
                        <span>Finaliza en</span>
                        <span>2 días</span>
                    </li>
                </ul>

                <p className={styles.collected}>Recaudado: $500.000</p>
                <div className={styles.progressBarOutside}>
                    <div className={styles.progressBarInside}/>
                </div>
                <div className={styles.goal}>
                    <div className={styles.goalLeftHandSide}>
                        <p className={styles.percentage}>50%</p>
                    </div>
                    <div className={styles.goalRightHandSide}>
                        <p className={styles.expected}>Meta: $500.000</p>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button variant="outlined" >Detalles</Button>
                    <Button variant="primary" size={"md"}>Invertir</Button>
                </div>

            </div>
        </div>
    );
}