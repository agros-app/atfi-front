import styles from './map.module.scss';
import Title from "@/app/(with-navbar)/project/components/title/title";

export default function Map(){
    return (
        <div className={styles.container}>
            <div className={styles.topSide}>
                <Title>Ubicación</Title>
                <div className={styles.location}>13000 Montevideo, Departamento de Montevideo</div>
            </div>
            <div className={styles.bottomSide}>
                <img src={"/sampleMap.png"} alt={"Estadio UNO location"}></img>
            </div>
        </div>
    );
}