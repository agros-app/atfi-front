'use client';
import styles from "./profileBanner.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";

export default function ProfileBanner() {


    const editModal = () => {
        //TODO
        console.log("TODO: Edit Profile Modal");
    }

    return (
      <div className={styles.container}>
          <ProfileImage src={"/owners/nico.jpg"} size={100}></ProfileImage>
          <div className={styles.data}>
              <h3 className={styles.title}>Lionel Messi</h3>
              <p className={styles.email}>leomessi@gmail.com</p>
          </div>
          <div className={styles.editContainer}>
              <img src={"/profile/Edit.png"} alt="Edit" className={styles.editIcon} onClick={editModal}/>
          </div>
      </div>
    );
}