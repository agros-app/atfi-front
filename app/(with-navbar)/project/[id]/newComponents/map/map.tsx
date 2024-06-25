import styles from './map.module.scss';

export default function Map(){
    return (
        <div>
            <div className={styles.location}>13000 Montevideo, Departamento de Montevideo</div>
            <div className={styles.bottomSide}>
                <img src={"/sampleMap.png"} alt={"Estadio UNO location"}></img>
            </div>
        </div>
    );
}