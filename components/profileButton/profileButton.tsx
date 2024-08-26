"use client"
import styles from "./profileButton.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import Link from "next/link";
import ProfileModal from "@/components/profileModal/profileModal";
import {useState} from "react";

export default function ProfileButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        // <Link  href='/profile/1'>
        <div className={styles.profileButtonContainer}>
            <div onClick={openModal}>
                <ProfileImage src={"/owners/nico.jpg"} size={60} />
            </div>
            {isModalOpen && <ProfileModal />}
        </div>
    );
}