'use client';
import styles from "./profileBanner.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import {useState} from "react";
import Button from "@/components/button/button";
import EditModalForm from "@/app/(with-navbar)/profile/components/editModal/editModal";
import {User} from "@/types/api";
import nicoImage from "@assets/images/owners/nico.webp";

type ProfileBannerProps = {
    user: User;
}

export default function ProfileBanner({user}: ProfileBannerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(nicoImage.src);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const editModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <ProfileImage src={nicoImage.src} size={100}></ProfileImage>
            </div>
            <div className={styles.data}>
                <h3 className={styles.title}>{user.name + " " + user.lastName}</h3>
                <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.editContainer}>
                <img className={styles.editIcon} src="/profile/Edit.png" alt="Edit" onClick={editModal}/>
                <input
                    type="file"
                    id="upload-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{display: "none"}}
                />
            </div>
            <EditModalForm
                isOpen={isModalOpen}
                onClose={closeModal}
                data={user}
                name={true}
                lastName={true}
                title={"Editar perfil"}
            />
        </div>
    );
}