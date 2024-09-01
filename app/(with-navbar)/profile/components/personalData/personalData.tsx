'use client';
import styles from "./personalData.module.scss";
import {User} from "@/types/api";
import {useState} from "react";
import EditModalForm from "@/app/(with-navbar)/profile/components/editModal/editModal";

type PersonalDataProps = {
    user: User
}

export default function PersonalData({user}: PersonalDataProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const editModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    function formatCuitToDni(): string {
        const dni = user.cuit.slice(2, -1);
        return `${dni.slice(0, 2)}.${dni.slice(2, 5)}.${dni.slice(5, 8)}`;
    }


    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h3 className={styles.title}>
                    Datos Personales
                </h3>
                <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Nombre y apellido</h3>
                            <p className={styles.value}>{user.name + " " + user.lastName}</p>
                        </div>
                        <div className={styles.col}>
                            <h3 className={styles.category}>DNI</h3>
                            <p className={styles.value}>{formatCuitToDni()}</p>
                        </div>
                        <div className={styles.editContainer}>
                            <img src={"/profile/Edit.png"} alt="Edit" className={styles.editIcon}
                                 onClick={editModal}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Nacionalidad</h3>
                            <p className={styles.value}>{user.country}</p>
                        </div>
                        <div className={styles.col}>
                            <h3 className={styles.category}>Teléfono</h3>
                            <p className={styles.value}>{user.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
            <EditModalForm
                isOpen={isModalOpen}
                onClose={closeModal}
                data={user}
                name={true}
                lastName={true}
                phone={true}
                country={true}
                cuit={true}
                title={"Datos Personales"}
            />
        </div>
    )

}