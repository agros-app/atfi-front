"use client";
import styles from "./verification.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Verification() {
    const [code, setCode] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Verificar si el email fue enviado, si no, redirigir a la página de recuperación
        if (!sessionStorage.getItem("emailSent")) {
            router.push("/recover-password");
        }
    }, [router]);

    function handleCodeSubmit(e: any) {
        e.preventDefault();
        // Aquí enviarías el código al backend para su verificación
        sessionStorage.setItem("code", "true")
        router.push("/recover-password/new-password");
    }

    return (
        <form className={styles.form} onSubmit={handleCodeSubmit}>
            <h1>Ingrese el código de verificación</h1>
            <TextField
                placeholder="Código de verificación"
                name="verificationCode"
                label="Código de verificación"
                onChange={(e) => setCode(e.target.value)}
            />
            <Button variant="primary" size="lg" className={styles.button}>
                Verificar
            </Button>
        </form>
    );
}
