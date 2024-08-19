import React from 'react'
import styles from './contact_section.module.scss'
import TextField from '@/components/textField/textField'

const ContactForm = () => {
  return (
    <div className={styles.contactFormContainer}>
      <h2 className={styles.heading}>
        Comenzá la transformación digital de tu campaña agricola
      </h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            alt="Contact us"
            className={styles.image}
            src="/agriculture/contact_us.avif"
          />
        </div>
        <form className={styles.form}>
          <h4>Contactanos para mas informacion</h4>
          <TextField placeholder="Nombre y Apellido" name="name" />
          <TextField placeholder="Email" name="email" />
          <TextField type={'number'} placeholder="Teléfono" name="phone" />
          <TextField
            rows={4}
            type={'textarea'}
            placeholder="Mensaje"
            name="message"
          />
        </form>
      </div>
    </div>
  )
}

export default ContactForm
