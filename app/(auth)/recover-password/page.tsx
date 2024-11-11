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
    const [error, setError] = useState("");

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
                setError("Error al enviar el correo de recuperación");
                console.error('Error en la solicitud de recuperación de contraseña: ', response.status);
            }
        } catch (error) {
            setError("Error de red o en la solicitud");
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
                {error &&
                    <TextField
                        placeholder="Email"
                        name="email"
                        label="Email"
                        error={error !== ""}
                        helperText={error}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                }
                {!error &&
                    <TextField
                        placeholder="Email"
                        name="email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                }
                <Button variant="primary" size="lg" className={styles.button}>
                    Continuar
                </Button>
            </form>
        </>
    );
}
