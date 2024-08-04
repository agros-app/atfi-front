import Logo from "@/assets/icons/logo";
import styles from "./login.module.scss";
import Link from "next/link";
import { LoginForm } from "./components";

export default function Login() {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <Logo size={150} />
      </Link>
      {/*<Services />*/}
      {/*<p>ó</p>*/}
      <LoginForm />
    </div>
  );
}
