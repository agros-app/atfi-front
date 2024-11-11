"use client";
import styles from "./newPassword.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {updatePassword} from "@/lib/api";
import {deleteSession} from "@/lib/session";

export default function NewPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (password !== repeatPassword){
            setError("Las contraseñas no coinciden");
        }
        else{
            try{
                await updatePassword(password);
                // TODO: ¿borrar el token?
                router.push("/login");
            } catch (error) {
                console.error("Error al verificar la contraseña:", error);
            }
        }
    }


    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h1>Ingresa tu nueva contraseña</h1>
            {error && <TextField
                placeholder="Contraseña"
                name="verificationCode"
                label="Contraseña"
                type="password"
                helperText={error}
                error={error !== ""}
                onChange={(e) => setPassword(e.target.value)}
            />}
            {!error &&
                <TextField
                    placeholder="Contraseña"
                    name="verificationCode"
                    label="Contraseña"
                    type="password"
                    error={error !== ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
            }
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
