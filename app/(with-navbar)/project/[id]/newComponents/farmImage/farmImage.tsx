import styles from "./farmImage.module.scss";

export default function FarmImage() {
  return (
    <div className={styles.header}>
        <img className={styles.image} src={"/project image.png"} alt="Farm Image" />
        <div className={styles.textInTitle}>
            <p className={styles.title}>El Bolero</p>
            <p className={styles.subtitle}>Montevideo</p>
        </div>
    </div>
  );
}