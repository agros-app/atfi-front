import styles from "./passwordModal.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import {useState} from "react";
import {checkPassword} from "@/lib/api";
import {getToken} from "@/lib/session";
import ChangePasswordModal from "./changePasswordModal";

type PasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function PasswordModal({isOpen, onClose}: PasswordModalProps){
    const [password, setPassword] = useState("");
    const [canChange, setCanChange] = useState(false);

    if (!isOpen) return null;



    const onSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        try{
            const response = await checkPassword(password);
            if (response.status === 200) {
                setCanChange(true);
            }
        } catch (error) {
            console.error("Error al verificar la contraseña:", error);
        }
    }

    return(
        <>
            {(!canChange) && (
                <div className={styles.container}>
                    <div className={styles.modalContent}>
                        <div className={styles.title}>
                            <h2>Password</h2>
                            <button className={styles.closeButton} onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <form className={styles.form} onSubmit={onSubmit}>
                                <TextField
                                    placeholder={"Contraseña actual"}
                                    name={"Contraseña actual"}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            <Button className={styles.buttonContainer} variant={"secondary"}>
                                Enviar
                            </Button>
                        </form>
                    </div>
                </div>
            )}
            {canChange && <ChangePasswordModal isOpen={isOpen} onClose={onClose} />}
        </>
    )

}
