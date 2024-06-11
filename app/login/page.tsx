import Logo from "@/assets/icons/logo";
import Image from "next/image";
import styles from "./login.module.scss";
import Link from "next/link";
import { LoginForm, Services } from "./components";

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.left}>
        <div className={styles.loginContainer}>
          <Link href={"/"}>
            <Logo size={150} />
          </Link>
          <Services />
          <p>ó</p>
          <LoginForm />
        </div>
      </section>
      <div className={styles.right}>
        <Image
          src={"/auth/bg_auth.jpg"}
          alt="atfi login background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </main>
  );
}
