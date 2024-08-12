"use client";

import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import {useEffect, useState} from "react";

export default function LandingNavBar({isLanding = true}) {
  const [producerDropdownVisible, setProducerDropdownVisible] = useState(false);
  const [investorDropdownVisible, setInvestorDropdownVisible] = useState(false);

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

  const toggleProducerDropdown = () => {
    setProducerDropdownVisible(!producerDropdownVisible);
    if (investorDropdownVisible) {
      setInvestorDropdownVisible(false);
    }
  };

  const toggleInvestorDropdown = () => {
    setInvestorDropdownVisible(!investorDropdownVisible);
    if (producerDropdownVisible) {
      setProducerDropdownVisible(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="#video">
          <Logo />
        </Link>
      </div>
      <div className={styles.right}>
        <Link href={"#how-it-works"}>¿Cómo funciona?</Link>
        <div className={styles.dropdown}>
          <button onClick={toggleProducerDropdown} className={styles.dropdownButton}>
            Productores
            <div className={styles.dropdownIcon}>
              {producerDropdownVisible ? closeIcon : dropdownIcon}
            </div>
          </button>
          {producerDropdownVisible && (
              <div className={styles.dropdownMenu}>
                <Link href={"/agriculture"}>Agricultores</Link>
                <Link href={"#solution2"}>Ganaderia</Link>
              </div>
          )}
        </div>
        <div className={styles.dropdown}>
          <button onClick={toggleInvestorDropdown} className={styles.dropdownButton}>
            Inversores
            <div className={styles.dropdownIcon}>
              {investorDropdownVisible ? closeIcon : dropdownIcon}
            </div>
          </button>
          {investorDropdownVisible && (
              <div className={styles.dropdownMenu}>
                <Link href={"/investor/agriculture"}>Agricultores</Link>
                <Link href={"/investor/ganaderia"}>Ganaderia</Link>
              </div>
          )}
        </div>
          <Link href={"#about-us"}>Nosotros</Link>
          <Link href={"/login"} className={styles.login}>
            Ingresar
          </Link>
        </div>
    </nav>
);
}

const dropdownIcon = (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className={styles.dropdownIcon}
  >
    <path
        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
    />
  </svg>
);

const closeIcon = (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className={styles.dropdownIcon}
  >
    <path
        d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h256c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
      />
    </svg>
);