import styles from "./filters.module.scss";

export default function Filters() {
  // TODO: Integrate backend
  return (
    <div>
      <h2>Proyectos</h2>
      <div className={styles.categories}>
      <div className={styles.category}>
        <h4>Ubicación</h4>
        <p>
          Argentina <b>(4)</b>
        </p>
        <p>
          Uruguay <b>(1)</b>
        </p>
        <p>
          Chile <b>(2)</b>
        </p>
      </div>
      <div className={styles.category}>
        <h4>Tipo de cosecha</h4>
        <p>
          Trigo <b>(4)</b>
        </p>
        <p>
          Soja <b>(1)</b>
        </p>
        <p>
          Girasol <b>(2)</b>
        </p>
      </div>
      </div>
      
    </div>
  );
}
