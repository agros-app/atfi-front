'use client'
import styles from './personalData.module.scss'

type HomeDataProps = {
  country: string
  city: string
  state: string
  address: string
}

export default function HomeData(data: HomeDataProps) {

  const editModal = () => {
    console.log('TODO: Edit Profile Modal')
  }

  const getStreetAndNumber = (address?: string) => {
    if (!address) {
      return {
        street: 'Dirección no proporcionada',
        number: 'SN'
      };
    }

    const regex = /^(.+?)\s(\d+.*)$/;
    const match = address.match(regex);

    if (match) {
      return {
        street: match[1],
        number: match[2]
      };
    } else {
      return {
        street: address,
        number: 'SN'
      };
    }
  };


  const { street, number } = getStreetAndNumber(data.address);

  return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>Domicilio</h3>
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
                <p className={styles.value}>{data.country}</p>
              </div>
              <div className={styles.col}>
                <h3 className={styles.category}>Provincia</h3>
                <p className={styles.value}>{data.state}</p>
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
                <p className={styles.value}>{data.city}</p>
              </div>
              <div className={styles.col}>
                <h3 className={styles.category}>Calle</h3>
                <p className={styles.value}>{street}</p>
              </div>
              <div className={styles.col}>
                <h3 className={styles.category}>Número</h3>
                <p className={styles.value}>{number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
