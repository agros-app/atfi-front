"use client";
import styles from "./profileButton.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import ProfileModal from "@/components/profileModal/profileModal";
import { useRef, useState, useEffect } from "react";
import useUserInfo from "@/hooks/useUserInfo";

export default function ProfileButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const profileImageRef = useRef<HTMLDivElement | null>(null);

    const { user } = useUserInfo();

    const [profileImage, setProfileImage] = useState("/placeholder.png");

    useEffect(() => {
        if (user && user.photoURL) {
            setProfileImage(`https://elbucke.s3.us-east-1.amazonaws.com/profile/${user.photoURL}`);
        }
    }, [user]);

    const setModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Manejador de clics fuera del modal
    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current && !modalRef.current.contains(event.target as Node) &&
            profileImageRef.current && !profileImageRef.current.contains(event.target as Node)
        ) {
            closeModal();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <div className={styles.profileButtonContainer}>
            <div ref={profileImageRef} onClick={setModal} className={styles.image}>
                <ProfileImage src={profileImage} size={60} />
            </div>
            {isModalOpen && (
                <div ref={modalRef}>
                    <ProfileModal closeModal={closeModal} user={user} />
                </div>
            )}
        </div>
    );
}
