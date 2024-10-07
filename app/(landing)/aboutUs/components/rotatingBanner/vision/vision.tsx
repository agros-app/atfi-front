import styles from "./vision.module.scss";


export default function Vision() {
    return (
        <div className={styles.container}>
            <div className={styles.screenDivision} >
                <div className={styles.leftHandSide}>
                    <div>
                        <div className={styles.tagContainer}>
                            <p className={styles.tag}>NUESTRA VISIÓN</p>
                        </div>
                        <h1 className={styles.heading}>
                            <span>Unir</span> el sector agropecuario y financiero en una sola app
                        </h1>
                        <p className={styles.text}>
                            Apuntamos a ser el nexo entre tecnología,
                            sector agropecuario y sector financiero más
                            importante de latinoamérica.</p>
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