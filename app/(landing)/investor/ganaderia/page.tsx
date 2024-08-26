import Footer from "@/components/footer/footer";
import styles from "@/app/(landing)/ganaderia/ganaderia.module.scss";
import AlternativeNavbar from "@/app/(landing)/components/alternativeNavbar/navbar";

export default function Page() {
    return (
        <>
            <AlternativeNavbar />
            <main className={styles.main}>
                <h1 className={styles.h1}>Proximamente en ATFI</h1>
            </main>
        </>
    );
}
