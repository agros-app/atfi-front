"use client";

import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useEffect } from "react";

export default function LandingNavBar() {
  useEffect(() => {
    const handleScroll = () => {
      // we can do this same effect withouth javascript using only css, but it's only supported on chromium-based browsers
      const navbar = document.querySelector("nav");
      const shouldBeToggled = window.scrollY > window.innerHeight / 2;
      if (!navbar) return;
      if (shouldBeToggled) {
        navbar?.classList.add(styles.filled_navbar);
      } else {
        navbar?.classList.remove(styles.filled_navbar);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="#video">
          <Logo />
        </Link>
      </div>
      <div className={styles.right}>
        <Link href={"#how-it-works"}>¿Cómo funciona?</Link>
        <Link href={"#our-solutions"}>Nuestras soluciones</Link>
        <Link href={"#about-us"}>Nosotros</Link>
        <Link href={"/login"} className={styles.login}>
          Ingresar
        </Link>
      </div>
    </nav>
  );
}
