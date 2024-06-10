import styles from './aboutUs.module.scss';
import OwnerProfile from "@/components/ownerProfile/ownerProfile";

export default function AboutUs(){
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Nosotros</h1>
            <div className={styles.us}>
                <OwnerProfile name={"Juan Perez"} job={"Co-founder, CEO"} />
                <OwnerProfile name={"Juan Perez"} job={"Co-founder, CEO"} />
                <OwnerProfile name={"Juan Perez"} job={"Co-founder, CEO"} />
            </div>
        </div>
    )
}

