import styles from './schedule.module.scss';

export default function Shedule() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cronograma</h1>
            <div className={styles.topData}>
                <div className={styles.leftHandSide}>
                    <p>Cierre de la ronda</p>
                    <p>25 de Marzo de 2024</p>
                </div>
                <div className={styles.rightHandSide}>
                    <p>32 días restantes</p>
                </div>
            </div>
            <div className={styles.bottomData}>
                <div className={styles.leftHandSide}>
                    <p>Mes estipulado de retornos</p>
                    <p>Abril de 2025</p>
                </div>
                <div className={styles.rightHandSide}>
                    <p>Un año y un mes</p>
                </div>
            </div>
        </div>
    );
}