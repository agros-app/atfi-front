"use client";
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import styles from "./loginForm.module.scss";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {validateLogin, isLoginValid, LoginData} from "@/utils/auth.validation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Partial<LoginData>>({});
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationErrors = validateLogin({ email, password });
        if (!isLoginValid(validationErrors)) {
            setErrors(validationErrors);
            toast.error('Por favor, corrija los errores en el formulario.');
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            document.cookie = `session=${data.token}`;
            router.push('/home');
        } else {
            toast.error(`Credenciales incorrectas`, { id: 'login-error' });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
                placeholder="Email"
                name="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                placeholder="Contraseña"
                name="password"
                label="Contraseña"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
            />
                <Link href="/recover-password" style={{
                    color: 'red',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    cursor: 'pointer',
                    textDecoration: 'none',
                }}>
                    ¿Olvidaste la contraseña?
                </Link>
            <Button variant="primary" size="lg" className={styles.button}>
                Continuar
            </Button>
            <p style={{textAlign: 'center'}}>
                ¿No tienes una cuenta?{' '}
                <Link href="/register" style={{
                    color: 'var(--green-850, #14452F)',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    cursor: 'pointer',
                    textDecoration: 'none',
                }}>
                    Regístrate
                </Link>
            </p>
        </form>
    );
}