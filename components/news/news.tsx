import image from "../../assets/Images/imagen_semillas.png";
import styles from "./news.module.scss";
import Button from "@/components/button/button";

export default function News(){
    return(
        <div className={styles.container}>
            <div className={styles.topSide}>
                <img src={image.src} alt="Crops image" className={styles.image} ></img>
            </div>
            <div className={styles.bottomSide}>
                <div className={styles.newspaper}>
                    <p>Clarín</p>
                </div>
                <h1 className={styles.title}>Mercado de granos: En 2023 creció el canje</h1>
                <p className={styles.description}>Un informe de la Bolsa de Comercio de Rosario señala el menor volumen negociado debido a la seca.</p>
                <Button size={"sm"}>Leer más </Button>
            </div>
        </div>
    )
}
