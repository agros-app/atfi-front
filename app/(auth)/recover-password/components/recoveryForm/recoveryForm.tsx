"use client"
import styles from "./recoveryForm.module.scss";
import TextField from "@/components/textField/textField";
import Link from "next/link";
import Button from "@/components/button/button";
import Logo from "@assets/icons/logo";
import {useState} from "react";

export default function RecoverPassword() {
    const [email, setEmail] = useState("");

    function handleSubmit() {

    }

    return (
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Recuperar contraseña</h1>
                <TextField
                    placeholder="Email"
                    name="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    // error={!!errors.email}
                    // helperText={errors.email}
                />
                <Button variant="primary" size="lg" className={styles.button}>
                    Continuar
                </Button>
            </form>
    )
}