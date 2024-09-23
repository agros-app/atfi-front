import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { getSession } from "@/lib/session";
import LogOutButton from "../log_out_button/LogOutButton";
import WalletButton from "../wallet_button/walletButton";
import ProfileImage from "@/components/profileImage/profileImage";
import BurgerMenu from "@/components/burger_menu/BurgerMenu";
import ProfileButton from "@/components/profileButton/profileButton";

export default async function NavBar() {
    const user = await getSession();
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/home">
                    <Logo />
                </Link>
                <div className={styles.links}>
                    <Link href={"/projects"}>
                        <p>Proyecto</p>
                    </Link>
                    <Link href={"/portfolio"}>
                        <p>Portfolio</p>
                    </Link>
                    <Link href={"submit-project"}>
                        <p>Subir proyecto</p>
                    </Link>
                </div>
            </div>
            <div className={styles.right}>
                {user ? <ProfileButton /> : <Link href="/login">Ingresar</Link>}
            </div>
            <BurgerMenu user={user} />
        </nav>
    );
}
