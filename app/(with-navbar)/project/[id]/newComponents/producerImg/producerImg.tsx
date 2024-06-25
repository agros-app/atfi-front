import styles from "./producerImg.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";


export default function ProducerImg() {
    return (
        <div className={styles.container}>
            <div className={styles.imageAndName}>
                <ProfileImage src={"/owners/nico.jpg"} size={80} />
                <h1 className={styles.name}>Diego</h1>
            </div>
            <div className={styles.info}>
                <p className={styles.text}>Más de</p>
                <p className={styles.number}>20</p>
                <p className={styles.text}>años de experiencia como</p>
                <p className={styles.text}>productor agropecuario</p>
            </div>
        </div>
    );
}