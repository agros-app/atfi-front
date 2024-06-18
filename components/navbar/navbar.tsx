import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import LogOutButton from "../log_out_button/LogOutButton";
import WalletButton from "../wallet_button/walletButton";

export default async function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/home">
          <Logo />
        </Link>
      </div>
      <div className={styles.right}>
        <WalletButton />
        <LogOutButton />
      </div>
    </nav>
  );
}
