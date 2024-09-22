'use client';
import styles from "./profileBanner.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import { useState } from "react";
import Button from "@/components/button/button";
import EditModalForm from "@/app/(with-navbar)/profile/components/editModal/editModal";
import { User } from "@/types/api";
import nicoImage from "@assets/images/owners/nico.webp";

type ProfileBannerProps = {
    user: User;
}

export default function ProfileBanner({user}: ProfileBannerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(nicoImage.src);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const editModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    }

    const handleConfirmImage = () => {
        if (selectedFile) {
            setProfileImage(previewImage!);
        }
        setIsModalOpen(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <ProfileImage src={profileImage} size={100} />
            </div>
            <div className={styles.data}>
                <h3 className={styles.title}>{user.name + " " + user.lastName}</h3>
                <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.editContainer}>
                <img className={styles.editIcon} src="/profile/Edit.png" alt="Edit" onClick={editModal} />
            </div>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Editar Perfil</h3>
                        <div className={styles.profileContainer}>
                            {previewImage ? (
                                <ProfileImage src={previewImage} size={150} />
                            ) : (
                                <ProfileImage src={profileImage} size={150} />
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className={styles.buttonContainer}>
                            <Button onClick={handleConfirmImage}>Confirmar</Button>
                            <Button variant={'tertiary'} onClick={closeModal}>Cancelar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
