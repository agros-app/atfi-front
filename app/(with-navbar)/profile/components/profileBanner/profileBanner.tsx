'use client';
import styles from "./profileBanner.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import {useState} from "react";
import Button from "@/components/button/button";
import EditModalForm from "@/app/(with-navbar)/profile/components/editModal/editModal";
import {User} from "@/types/api";

type ProfileBannerProps = {
    user: User;
}

export default function ProfileBanner({user}: ProfileBannerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const editModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
      <div className={styles.container}>
          <ProfileImage src={"/owners/nico.jpg"} size={100}></ProfileImage>
          <div className={styles.data}>
              <h3 className={styles.title}>{user.name + " " + user.lastName}</h3>
              <p className={styles.email}>{user.email}</p>
          </div>
          <div className={styles.editContainer}>
              <img src={"/profile/Edit.png"} alt="Edit" className={styles.editIcon} onClick={editModal}/>
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