import Logo from "@/assets/icons/logo";
import Image from "next/image";
import styles from "./login.module.scss";
import Link from "next/link";
import { LoginForm, Services } from "./components";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <Link href={"/"}>
        <Logo size={150} />
      </Link>
      <Services />
      <p>ó</p>
      <LoginForm />
    </div>
  );
}
