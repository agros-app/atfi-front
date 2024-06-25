"use client";
import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import styles from "./loginForm.module.scss";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginForm() {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        signIn("credentials", {
          email: event.target.email.value,
          password: event.target.password.value,
          redirect: false,
          callbackUrl: "/home",
        }).catch((error) => toast.error(error.message));
      }}
    >
      <TextField placeholder="Email" name="email" type="email" label="Email" />
      <TextField
        placeholder="Contraseña"
        name="password"
        type="password"
        label="Contraseña"
      />
      <Button variant="primary" size="lg">
        Continuar
      </Button>
    </form>
  );
}
