import styles from "./header.module.scss";

export default function Header({name, country}: {name: string ,country: string}) {
    return (
      <div className={styles.header}>
          <img className={styles.image} src={"/project_bg.png"} alt="Farm Image" />
          <div className={styles.textInTitle}>
              <p className={styles.title}>{name}</p>
              <p className={styles.subtitle}>{country}</p>
          </div>
      </div>
    );
  }