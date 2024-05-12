import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { getSession } from "@/lib/session";
import Button from "../button/button";

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
        {user ? (
          <Button>Cerrar Sesión</Button>
        ) : (
          <Link href="/login">Ingresar</Link>
        )}
      </div>
    </nav>
  );
}
