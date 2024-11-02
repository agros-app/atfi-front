import React from "react";
import styles from "./whatsapp.module.scss";
import Image from "next/image";
import whatsAppImage from "@assets/images/whatsapp_icon.png";

export default function Whatsapp() {
  return (
    <div className={styles.container}>
        <a href="https://wa.me/543413306648" target="_blank" rel="noopener noreferrer">
            <Image
                src={whatsAppImage.src}
                width={whatsAppImage.width}
                height={whatsAppImage.height}
                alt="Whatsapp Icon"
                className={styles.image}
            />
        </a>
        <div className={styles.info}>
            <p className={styles.boldText}>¿Te podemos ayudar en algo?</p>
            <p>Lunes a Viernes de 8 a 16 horas</p>
      </div>
    </div>
  );
}
