"use client"
import Link from "next/link";
import styles from "./burgerMenu.module.scss";
import {useWeb3} from "@/context/web3Modal";


// @ts-ignore
export default function BurgerMenu({ user }) {
    const { connectWallet, disconnectWallet, isConnected } = useWeb3();
    const logOut = async () => {
        await fetch("/api/auth/sign-out");
    };

    const handleWalletAction = async () => {
        if (isConnected) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    };
    return (
        <div className={styles.hamburgerMenu}>
            <input id="menu__toggle" type="checkbox" className={styles.menuToggle} />
            <label className={styles.menuBtn} htmlFor="menu__toggle">
                <span></span>
            </label>

            <ul className={styles.menuBox}>
                <li><Link className={styles.menuItem} href="/home">Home</Link></li>
                <li><Link className={styles.menuItem} href="/projects">Proyecto</Link></li>
                {/*TODO: Add portfolio when is available*/}
                {/*<li><Link className={styles.menuItem} href="/portfolio">Portfolio</Link></li>*/}
                <li><Link className={styles.menuItem} href="/submit-project">Subir proyecto</Link></li>
                {user && (
                    <li>
                        <a
                            href="#"
                            className={styles.menuItem}
                            onClick={(e) => {
                                e.preventDefault();
                                handleWalletAction();
                            }}
                        >
                            {isConnected ? "Desconectar billetera" : "Conectar billetera"}
                        </a>
                    </li>
                )}
                <li><Link className={styles.menuItem} href="/profile">Perfil</Link></li>
                {user ? (
                    <>
                        <li><Link className={styles.menuItem} href="/" onClick={logOut}>Cerrar sesión</Link></li>
                    </>
                ) : (
                    <li><Link className={styles.menuItem} href="/login">Ingresar</Link></li>
                )}
            </ul>
        </div>
    );
}