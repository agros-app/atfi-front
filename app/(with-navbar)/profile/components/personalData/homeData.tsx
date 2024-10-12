'use client'
import styles from './personalData.module.scss'
import EditModalForm from "@/app/(with-navbar)/profile/components/editModal/editModal";
import {useEffect, useState} from "react";

type HomeDataProps = {
  country: string
  city: string
  state: string
  address: string
}

export default function HomeData(data: HomeDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const editModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleUpdate = (updatedData: HomeDataProps) => {
    setUserData(updatedData);
  }

  return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>Datos Personales</h3>
            <p className={styles.editTitle}>
              <img
                  src={'/profile/edit.png'}
                  alt="Edit"
                  className={styles.editIcon}
                  onClick={editModal}
              />
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.row}>
              <div className={styles.col}>
                <h3 className={styles.category}>País</h3>
                <p className={styles.value}>{userData.country}</p>
              </div>
              <div className={styles.col}>
                <h3 className={styles.category}>Provincia</h3>
                <p className={styles.value}>{userData.state}</p>
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
            <div className={styles.row}>
              <div className={styles.col}>
                <h3 className={styles.category}>Ciudad</h3>
                <p className={styles.value}>{userData.city}</p>
              </div>
              <div className={styles.col}>
                <h3 className={styles.category}>Dirección</h3>
                <p className={styles.value}>{userData.address}</p>
              </div>
            </div>
          </div>
        </div>
        <EditModalForm
            isOpen={isModalOpen}
            onClose={closeModal}
            data={userData}
            title={'Datos del Hogar'}
            fields={[
              {name: 'country', label: 'País', placeholder: userData.country},
              {name: 'state', label: 'Provincia', placeholder: userData.state},
              {name: 'city', label: 'Ciudad', placeholder: userData.city},
              {name: 'address', label: 'Dirección', placeholder: userData.address},
            ]}
            onUpdate={handleUpdate}
        />
      </div>
  )
}