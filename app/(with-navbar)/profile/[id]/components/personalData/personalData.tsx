'use client';
import styles from "./personalData.module.scss";

export default function PersonalData() {

    const editModal = () => {
        //TODO
        console.log("TODO: Edit Profile Modal");
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h3 className={styles.title}>
                    Datos Personales
                </h3>
                <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Nombre y apellido</h3>
                            <p className={styles.value}>Lionel Messi</p>
                        </div>
                        <div className={styles.col}>
                            <h3 className={styles.category}>DNI</h3>
                            <p className={styles.value}>40.123.456</p>
                        </div>
                        <div className={styles.editContainer}>
                            <img src={"/profile/Edit.png"} alt="Edit" className={styles.editIcon}
                                 onClick={editModal}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Nacionalidad</h3>
                            <p className={styles.value}>Argentina</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}