import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import styles from "./loginForm.module.scss";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <TextField placeholder="Email" name="email" label="Email" />
      <TextField placeholder="Contraseña" name="email" label="Contraseña" />
      <Button variant="primary" size="lg">
        Continuar
      </Button>
    </form>
  );
}
