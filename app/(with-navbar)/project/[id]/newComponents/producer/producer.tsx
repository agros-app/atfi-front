import styles from "./producer.module.scss";
import ProducerImg from "@/app/(with-navbar)/project/[id]/newComponents/producerImg/producerImg";
import Button from "@/components/button/button";

export default function Producer() {
    return (
        <div className={styles.container}>
            <h1 className={styles.titl}>Productor</h1>
            <div className={styles.screenDivision}>
                <div className={styles.leftHandSide}>
                    <ProducerImg />
                    <Button className={styles.button}>Escribile al productor</Button>
                </div>
                <div className={styles.rightHandSide}>
                    <p className={styles.subtitle}>Acerca</p>
                    <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
                </div>
            </div>
        </div>
    );
}
