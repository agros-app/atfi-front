import styles from "./personalData.module.scss";
import {useState} from "react";
import EditModalForm from "@/app/(with-navbar)/profile/components/editModal/editModal";
import PasswordModal from "@/app/(with-navbar)/profile/components/passwordModal/passwordModal";
import {getToken} from "@/lib/session";

export default function PasswordData(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const editModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return(
        <div>
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.titleContainer}>
                        <h3 className={styles.title}>Contraseña</h3>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <h3 className={styles.category}>Contraseña</h3>
                                <p className={styles.value}>**********</p>
                            </div>
                            <div className={styles.editContainer}>
                                <img
                                    src={'/profile/edit.png'}
                                    alt="Edit"
                                    className={styles.editIcon}
                                    onClick={editModal}
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            <PasswordModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}