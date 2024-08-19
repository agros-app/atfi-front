import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { getSession } from "@/lib/session";
import LogOutButton from "../log_out_button/LogOutButton";

export default async function NavBar() {
  const user = await getSession();
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/projects">Proyectos</Link>
        <Link href="/simulator">Simulador</Link>
        {user ? <LogOutButton /> : <Link href="/login">Ingresar</Link>}
      </div>
    </nav>
  );
}
