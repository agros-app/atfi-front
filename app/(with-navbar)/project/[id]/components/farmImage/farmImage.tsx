import Title from '../title/title';
import styles from './farmImage.module.scss';

export default function FarmImage({duration}:{duration:number}){
    return(
        <div className={styles.container}>
            <div className={styles.topSide}>
                {/*The default image /Reasons-to-visit-the-countryside 1.png already has a radius. CHANGE IT */}
                <img
                    className={styles.image}
                    src={"/Reasons-to-visit-the-countryside 1.png"}
                    alt="Farm Image"
                />
            </div>
            <div className={styles.bottomSide}>
                <div className={styles.dataGroup}>
                    <p className={styles.dataValue}>400%</p>
                    <Title hover={true}>ROI</Title>
                </div>
                <div className={styles.dataGroup}>
                    <p className={styles.dataValue}>{duration}</p>
                    <Title hover={true}>Días restantes</Title>
                </div>
                <div className={styles.dataGroup}>
                    <p className={styles.dataValue}>6%</p>
                    <Title hover={true}>Data 3</Title>
                </div>
                <div className={styles.dataGroup}>
                    <p className={styles.dataValue}>2x</p>
                    <Title hover={true}>Data 4</Title>
                </div>
                <div className={styles.dataGroup}>
                    <p className={styles.dataValue}>11,3%</p>
                    <Title hover={true}>Data 5</Title>
                </div>
            </div>
        </div>
    )
}