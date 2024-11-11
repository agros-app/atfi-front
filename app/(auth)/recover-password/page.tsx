"use client";
import styles from "./recoverPassword.module.scss";
import TextField from "@/components/textField/textField";
import Link from "next/link";
import Button from "@/components/button/button";
import Logo from "@assets/icons/logo";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {requestRecoverPassword} from "@/lib/api";

export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            const response = await requestRecoverPassword(email);
            if (response.status === 200) {
                console.log('Correo de recuperación enviado');
                sessionStorage.setItem("emailSent", "true");
                sessionStorage.setItem("email", email);
                router.push("/recover-password/verification");
            } else {
                console.error('Error en la solicitud de recuperación de contraseña: ', response.status);
            }
        } catch (error) {
            console.error('Error de red o en la solicitud: ', error);
        }
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
