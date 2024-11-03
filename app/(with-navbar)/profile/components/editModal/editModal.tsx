import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";
import styles from "./editModal.module.scss";
import {CompleteUserInfo, User} from "@/types/api";
import {updateUserInfo} from "@/lib/api";
import toast from "react-hot-toast";

type EditProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: Partial<User>;
    title: string;
    fields: { name: keyof User; label: string; placeholder: string }[];
    onUpdate: (updatedUser: User) => void;
}

export default function EditModalForm({
                                                 isOpen,
                                                 onClose,
                                                 data,
                                                 title,
                                                 fields,
                                                 onUpdate
                                             }: EditProfileModalProps) {
    const [formData, setFormData] = useState(data);

    if (!isOpen) return null;

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para convertir Partial<User> a CompleteUserInfo
    const convertToCompleteUserInfo = (user: Partial<User>): CompleteUserInfo => {
        return {
            name: user.name || '',
            lastName: user.lastName || '',
            phone: user.phone || '',
            country: user.country || '',
            cuit: user.cuit || '',
            city: user.city || '',
            address: user.address || '',
            state: user.state || '',
        };
    };

    const onSubmit = async () => {
        try {
            const completeUserInfo = convertToCompleteUserInfo(formData);
            const updatedUser = await updateUserInfo(completeUserInfo);
            toast.success("Información actualizada con éxito");
            onClose();
            onUpdate(updatedUser);
        } catch (error) {
            toast.error("Hubo un error al actualizar la información");
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modalContent}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form className={styles.form} onSubmit={onSubmit}>
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            placeholder={field.placeholder}
                            name={field.name}
                            onChange={handleInputChange}
                        />
                    ))}
                    <Button className={styles.buttonContainer} variant={"secondary"}>
                        Aplicar Cambios
                    </Button>
                </form>
            </div>
        </div>
    );
}