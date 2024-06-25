import styles from "./farmImage.module.scss";

export default function FarmImage({name}: {name: string}) {
  return (
    <div className={styles.header}>
        <img className={styles.image} src={"/project image.png"} alt="Farm Image" />
        <div className={styles.textInTitle}>
            <p className={styles.title}>{name}</p>
            <p className={styles.subtitle}>Argentina</p>
        </div>
    </div>
  );
}