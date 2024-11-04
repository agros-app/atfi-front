"use client";
import styles from "./recoverPassword.module.scss";
import TextField from "@/components/textField/textField";
import Link from "next/link";
import Button from "@/components/button/button";
import Logo from "@assets/icons/logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    function handleSubmit(e: any) {
        e.preventDefault();
        // TODO: add logic here once the endpoints exist on the backend
        // Si el envío es exitoso, guardamos una marca en sessionStorage y redirigimos
        sessionStorage.setItem("emailSent", "true");
        router.push("/recover-password/verification");
    }

    return (
        <>
            <Link href="/">
                <div className={styles.logoContainer}>
                    <Logo size={150} />
                </div>
            </Link>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Recuperar contraseña</h1>
                <TextField
                    placeholder="Email"
                    name="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="primary" size="lg" className={styles.button}>
                    Continuar
                </Button>
            </form>
        </>
    );
}
