import styles from './register.module.scss';
import Logo from "@/assets/icons/logo";
import RegisterForm from "@/app/(auth)/register/components/registerForm";
import Link from "next/link";
export default function Register() {
    return (
        <div className={styles.container}>
            <Link href={"/"}>
                <Logo size={150} />
            </Link>
            <RegisterForm/>
        </div>
    )
}