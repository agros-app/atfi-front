import Logo from "@/assets/icons/logo";
import styles from "./login.module.scss";
import Link from "next/link";
import { LoginForm } from "./components";
import Services from "@/components/services/services";

export default function Login() {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
          <div className={styles.logoContainer}>
              <Logo size={150} />
          </div>
      </Link>
      <Services />
      <p>ó</p>
      <LoginForm />
    </div>
  );
}
