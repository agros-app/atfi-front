import styles from "./mission.module.scss";
import Image from "next/image";
import contactUsImage from "@assets/images/agriculture/contact_us.webp";

export default function Mission() {
    return (
        <div className={styles.container}>
            <div className={styles.screenDivision} >
                <div className={styles.leftHandSide}>
                    <div>
                        <div className={styles.tagContainer}>
                            <p className={styles.tag}>NUESTRA MISIÓN</p>
                        </div>
                        <h1 className={styles.heading}>
                            Ofrecemos servicios financieros
                            <span> accesibles </span>
                            a los actores agropecuarios
                        </h1>
                        <p className={styles.text}>
                            Creemos en hacer accesible la producción agronómica a cualquier persona.</p>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img
                        alt="Contact us"
                        className={styles.image}
                        src={"/aboutUs/office_worker1.png"}
                    />
                    <img
                        alt="Contact us"
                        className={styles.image2}
                        src={"/aboutUs/office_worker2.png"}
                    />
                </div>
            </div>
        </div>
    );
}