"use client"
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import styles from "./loginForm.module.scss";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            });
        if (response.ok){
            const data = await response.json();
            document.cookie = `session=${data.token}`;
            router.push('/home');
        }
        else{
            toast.error(`Credenciales incorrectas`, {id: 'login-error'} );
        }
    }
      return (
          <form className={styles.form} onSubmit={handleSubmit}>
              <TextField
                  placeholder="Email"
                  name="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                  placeholder="Contraseña"
                  name="password"
                  label="Contraseña"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" size="lg">
                  Continuar
              </Button>
              <p style={{ textAlign: 'center' }}>
                  No tienes una cuenta?{' '}
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
