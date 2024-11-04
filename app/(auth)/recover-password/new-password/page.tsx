"use client";
import styles from "./newPassword.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        // Verificar si el email fue enviado, si no, redirigir a la página de recuperación
        if (!sessionStorage.getItem("emailSent") || !sessionStorage.getItem("code")) {
            router.push("/recover-password");
        }
    }, [router]);

    const onSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (password !== repeatPassword){
            setError("Las contraseñas no coinciden");
        }
        else{
            router.push("/login");
        }
    }


    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h1>Ingresa tu nueva contraseña</h1>
            <TextField
                placeholder="Contraseña"
                name="verificationCode"
                label="Contraseña"
                type="password"
                error={error !== ""}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                placeholder="Repetir contraseña"
                name="verificationCode"
                label="Repetir contraseña"
                type="password"
                onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button variant="primary" size="lg" className={styles.button}>
                Verificar
            </Button>
        </form>
    );
}
