import Button from "@/components/button/button";
import TextField from "@/components/textField/textField";
import {useState} from "react";
import styles from "./editModal.module.scss";
import {User} from "@/types/api";

type EditProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: User;
    title: string;
    name?: boolean;
    lastName?: boolean;
    phone?: boolean;
    country?: boolean;
    cuit?: boolean;
}

export default function EditModalForm({isOpen, onClose, data, title, name=false, lastName=false, cuit=false, phone=false, country=false}: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        country: data.country,
        cuit: data.cuit
    });

    if (!isOpen) return null;

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
                <form className={styles.form}>
                    {name && (
                        <TextField
                            placeholder={data.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    )}
                    {lastName && (
                        <TextField
                            placeholder={data.lastName}
                            name="lastName"
                            onChange={handleInputChange}
                        />
                    )}
                    {phone && (
                        <TextField
                            placeholder={data.phone}
                            name="phone"
                            onChange={handleInputChange}
                        />
                    )}
                    {country && (
                        <TextField
                            placeholder={data.country}
                            name="country"
                            onChange={handleInputChange}
                        />
                    )}
                    {cuit && (
                        <TextField
                            placeholder={data.cuit}
                            name="cuit"
                            onChange={handleInputChange}
                        />
                    )}
                    <Button className={styles.buttonContainer} variant={"secondary"} onClick={onClose}>Aplicar Cambios</Button>
                </form>
            </div>
        </div>
    );
}
