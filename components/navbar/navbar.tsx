"use client";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
//import { getSession } from "@/lib/session";
import LogOutButton from "../log_out_button/LogOutButton";
import Button from "@/components/button/button";
import {useWeb3} from "@/context/web3Modal";

export default function NavBar() {

    const {connectWallet, isConnected} = useWeb3();

    const handleConnectWallet = async () => {
        connectWallet();
    }

  //const user = await getSession();
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
        <Button onClick={handleConnectWallet} size={"md"} variant={"secondary"}>{isConnected ? 'Desconectar' : 'Conectar'} Billetera</Button>
      </div>
    </nav>
  );
}
