import styles from "@/app/(with-navbar)/profile/components/passwordModal/passwordModal.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import {useState} from "react";
import {checkPassword, updatePassword} from "@/lib/api";

type ChangePasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({isOpen, onClose}: ChangePasswordModalProps) {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const onSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (password !== repeatPassword){
            setError("Las contraseñas no coinciden");
        }
        else{
            try{
                await updatePassword(password);
            } catch (error) {
                console.error("Error al verificar la contraseña:", error);
            }
            // TODO: necesito los endpoints del back.
            onClose();
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.modalContent}>
                <div className={styles.title}>
                    <h2>New Password</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form className={styles.form} onSubmit={onSubmit}>
                    <TextField
                        placeholder={"Contraseña nueva"}
                        name={"Contraseña nueva"}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        error={error !== ""}
                    />
                    <TextField
                        placeholder={"Repetir contraseña"}
                        name={"Repetir contraseña"}
                        type="password"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <Button className={styles.buttonContainer} variant={"secondary"}>
                        Enviar
                    </Button>
                </form>
            </div>
        </div>
    )
}