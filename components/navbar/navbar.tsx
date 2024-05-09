import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";

export default function NavBar() {
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
        <Link href="/login">Ingresar</Link>
      </div>
    </nav>
  );
}
