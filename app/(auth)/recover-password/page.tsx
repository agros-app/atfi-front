import styles from "@/app/(auth)/login/components/loginForm/loginForm.module.scss";
import TextField from "@/components/textField/textField";
import Link from "next/link";
import Button from "@/components/button/button";

export default function RecoverPassword() {
    return (
        <form className={styles.form}>
            <TextField
                placeholder="Email"
                name="email"
                label="Email"
                // onChange={(e) => setEmail(e.target.value)}
                // error={!!errors.email}
                // helperText={errors.email}
            />
            <Button variant="primary" size="lg" className={styles.button}>
                Continuar
            </Button>
        </form>
    )
}