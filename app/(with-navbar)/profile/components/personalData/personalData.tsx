'use client'
import styles from './personalData.module.scss'
import {useEffect, useState} from 'react'
import EditModalForm from '@/app/(with-navbar)/profile/components/editModal/editModal'


type PersonalDataProps = {
  name: string
  lastName: string
  cuit: string
  phone: string
  country: string
}

export default function PersonalData(user: PersonalDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const editModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleUpdate = (updatedUser: PersonalDataProps) => {
    setUserData(updatedUser);
  }

  function formatCuitToDni(): string {
    const dni = user.cuit.slice(2, -1);
    return `${dni.slice(0, 2)}.${dni.slice(2, 5)}.${dni.slice(5, 8)}`;
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
                <h3 className={styles.category}>Nombre y apellido</h3>
                <p className={styles.value}>{user.name + ' ' + user.lastName}</p>
              </div>
              <div className={styles.col}>
                <h3 className={styles.category}>DNI</h3>
                <p className={styles.value}>{formatCuitToDni()}</p>
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
            data={userData}
            title={'Datos Personales'}
            fields={[
              {name: 'name', label: 'Nombre', placeholder: userData.name},
              {name: 'lastName', label: 'Apellido', placeholder: userData.lastName},
              {name: 'phone', label: 'Teléfono', placeholder: userData.phone},
              {name: 'country', label: 'Nacionalidad', placeholder: userData.country},
              {name: 'cuit', label: 'CUIT', placeholder: userData.cuit},
            ]}
            onUpdate={handleUpdate}
        />
      </div>
  )
}