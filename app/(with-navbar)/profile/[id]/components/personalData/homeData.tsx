'use client';
import styles from "./personalData.module.scss";

export default function HomeData() {

    const editModal = () => {
        //TODO
        console.log("TODO: Edit Profile Modal");
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h3 className={styles.title}>
                    Domicilio
                </h3>
                <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h3 className={styles.category}>País</h3>
                            <p className={styles.value}>Argentina</p>
                        </div>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Provincia</h3>
                            <p className={styles.value}>Buenos Aires</p>
                        </div>
                        <div className={styles.editContainer}>
                            <img src={"/profile/Edit.png"} alt="Edit" className={styles.editIcon}
                                 onClick={editModal}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Ciudad</h3>
                            <p className={styles.value}>La Plata</p>
                        </div>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Calle</h3>
                            <p className={styles.value}>1 y 57</p>
                        </div>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Piso/Lote</h3>
                            <p className={styles.value}>123, 8A</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}