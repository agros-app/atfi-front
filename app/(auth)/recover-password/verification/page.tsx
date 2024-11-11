"use client";
import styles from "./verification.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import { validatePasswordReset } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Verification() {
    const [code, setCode] = useState("");
    const router = useRouter();

    useEffect(() => {
        const emailSent = sessionStorage.getItem("emailSent");
        if (!emailSent) {
            router.push("/recover-password"); // Redirige si no se encuentra emailSent
        }
    }, [router]);

    async function handleCodeSubmit(e: any) {
        e.preventDefault();
        let email;
        try {
            email = sessionStorage.getItem("email");
        } catch (error) {
            console.error("Error getting email");
        }
        try {
            if (email) {
                const codeInt = parseInt(code, 10);
                const token = await validatePasswordReset(email, codeInt);
                document.cookie = `session=${token}`;
                router.push("/recover-password/new-password");
            }
        } catch (error) {
            console.error("Error validating code:", error);
        }
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
