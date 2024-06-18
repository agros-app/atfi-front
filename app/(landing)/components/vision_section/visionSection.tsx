import styles from "./visionSection.module.scss";

export default function VisionSection() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Lo mejor de ambos mundos</h2>
      <p className={styles.description}>
        Somos un equipo de jóvenes emprendedores apasionados por la tecnología y
        las finanzas. Nuestra misión es brindar soluciones innovadoras para que
        puedas invertir de forma segura y sencilla.
      </p>
      <div className={styles.cardsContainer}>
        <div className={styles.vision}>
          <div className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            Nuestra <br /> visión
          </h3>
          <p className={styles.cardDescription}>
            Ser líderes en la creación de soluciones innovadoras para la
            industria agropecuaria, que promueven la sostenibilidad y el
            bienestar de las comunidades rurales.
          </p>
        </div>
        <div className={styles.mission}>
          <div className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            Nuestra <br /> misión
          </h3>
          <p className={styles.cardDescription}>
            Ofrecer productos y servicios financieros confiables y accesibles a
            los actores agropecuarios, a través de tecnologías blockchain.
          </p>
        </div>
      </div>
    </section>
  );
}
