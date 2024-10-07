import styles from "./value.module.scss";

type ValueProps = {
    heading: string;
    text: string;
}

export default function Value({heading, text}: ValueProps) {
    return(
        <section className={styles.container}>
            <h3 className={styles.heading}>{heading}</h3>
            <p className={styles.text}>{text}</p>
        </section>
    )
}