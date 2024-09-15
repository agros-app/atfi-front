import styles from "./ganaderia.module.scss"
import AlternativeNavbar from "@/app/(landing)/components/alternativeNavbar/navbar";

export default function GanaderiaPage(){
    return <>
        <main className={styles.main}>
            <h1 className={styles.h1}>Próximamente en AGRAS</h1>
        </main>
    </>
}