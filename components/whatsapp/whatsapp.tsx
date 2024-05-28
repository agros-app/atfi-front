import React from 'react';
import whatsapp from '@/assets/icons/ContactPopUp.png';
import styles from './whatsapp.module.scss';

export default function Whatsapp() {
    return (
        <div className={styles.container}>
            <img src={whatsapp.src} alt="Whatsapp Icon" className={styles.image}></img>
            <div className={styles.info}>
                <p className={styles.boldText}>¿Te podemos ayudar en algo?</p>
                <p>Lunes a Viernes de 8 a 16 horas</p>
            </div>
        </div>
    );
}
