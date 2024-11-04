import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { getSession } from "@/lib/session";
import BurgerMenu from "@/components/burger_menu/BurgerMenu";
import ProfileButton from "@/components/profileButton/profileButton";

export default async function NavBar() {
    const user = await getSession();

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/home" >
                    <img src={"/logo.png"} style={{height: "45px", width: "auto"}} alt={"logo"} />
                </Link>
                <div className={styles.links}>
                    <Link href={"/projects"}>
                        <p>Proyectos</p>
                    </Link>
                    <Link href={"/portfolio"}>
                        <p>Portfolio</p>
                    </Link>
                    {user?.role == "PRODUCER" && (
                        <Link href={"/submit-project"}>
                            <p>Subir proyecto</p>
                        </Link>
                    )}
                    <Link href={"/simulator"}>
                        <p>Simulador</p>
                    </Link>
                    {user?.role === "ADMIN" && (
                        <Link href={"/pending-projects"}>
                            <p>Proyectos Pendientes</p>
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.right}>
                {user ? <ProfileButton /> : <Link href="/login">Ingresar</Link>}
            </div>
            <BurgerMenu user={user} />
        </nav>
    );
}