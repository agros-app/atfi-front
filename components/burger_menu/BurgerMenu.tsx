import Link from "next/link";
import styles from "./burgerMenu.module.scss";

export default function BurgerMenu() {
    return (
        <div className={styles.hamburgerMenu}>
            <input id="menu__toggle" type="checkbox" className={styles.menuToggle} />
            <label className={styles.menuBtn} htmlFor="menu__toggle">
                <span></span>
            </label>

            <ul className={styles.menuBox}>
                <li><Link className={styles.menuItem} href="/home">Home</Link></li>
                <li><Link className={styles.menuItem} href="/projects">Proyectos</Link></li>
                <li><Link className={styles.menuItem} href="/portfolio">Portfolio</Link></li>
                <li><Link className={styles.menuItem} href="/upload">Subir Proyecto</Link></li>
                <li><Link className={styles.menuItem} href="/contact">Contacto</Link></li>
            </ul>
        </div>
    );
}