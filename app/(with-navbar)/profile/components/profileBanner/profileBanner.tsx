'use client';
import styles from "./profileBanner.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import { useState, useEffect } from "react";
import Button from "@/components/button/button";
import { User } from "@/types/api";
import { eraseUserPhoto, updateUserPhoto } from "@/lib/api";
import toast from "react-hot-toast";

type ProfileBannerProps = {
    user: User;
}

export default function ProfileBanner({user}: ProfileBannerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState("/placeholder.png");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.photoURL) {
            setProfileImage(`https://elbucke.s3.us-east-1.amazonaws.com/profile/${user.photoURL}`);
        }
    }, [user]);

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
        const validImageTypes = ['image/jpeg', 'image/png'];
        const maxSizeInMB = 5;
    
        if (file) {
            if (!validImageTypes.includes(file.type)) {
                toast('Por favor, selecciona un archivo de imagen válido (JPG, PNG).');
                return;
            }
    
            if (file.size > maxSizeInMB * 1024 * 1024) {
                toast('El archivo debe ser de un tamaño máximo de 5MB.');
                return;
            }
    
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };
    
    const handleConfirmImage = async () => {
        if (selectedFile) {
            const uploadURL = await updateUserPhoto();
            console.log(uploadURL);
            
            if (!uploadURL) {
                console.error("Failed to get upload URL");
                return;
            }

            try {
                const response = await fetch(uploadURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': selectedFile.type,
                    },
                    body: selectedFile,
                });
    
                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }
    

                setProfileImage(uploadURL.substring(0, uploadURL.indexOf('?')));
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
        setIsModalOpen(false);
        window.location.reload();
    };

    const handleEraseImage = async() => {
        await eraseUserPhoto();
        setProfileImage("/placeholder.png");
        setIsModalOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
        window.location.reload();
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
                <img className={styles.editIcon} src="/profile/edit.png" alt="Edit" onClick={editModal} />
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
                            <Button variant={'secondary'} onClick={handleEraseImage}>Borrar Imagen</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
