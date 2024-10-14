import styles from './producer.module.scss'
import ProfileImage from '@/components/profileImage/profileImage'
import TextField from '@/components/textField/textField'
import Button from '@/components/button/button'
import { ProjectDetailInfo, ProjectMessage } from '@/types/api'
import { useState } from 'react'
import toast, { useToaster } from 'react-hot-toast'
import nicoImage from '@assets/images/owners/nico.webp'
import { messageProducerByProjectId } from '@/lib/api'

interface Props {
  producerName: string
  producerLastName: string
  producerEmail: string

  onSuccess: (message: ProjectMessage) => void
}

export default function Producer({
  producerName,
  producerLastName,
  producerEmail,
  onSuccess
}: Props) {
  const [message, setMessage] = useState('')
  const onSendMessage = async (message: string) => {
    if (message === '') {
      toast.error('El mensaje no puede estar vacio')
    } else {
      try {
        const response = await messageProducerByProjectId(1, message)
        toast.success('Mensaje enviado correctamente')
        setMessage('')
        onSuccess(response)
      } catch (error) {
        toast.error('Error al enviar el mensaje intentelo mas tarde nuevamente')
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Productor</div>
      <div className={styles.profile}>
        <ProfileImage src={nicoImage.src} size={60} />
        <div
          className={styles.name}
        >{`${producerName} ${producerLastName}`}</div>
      </div>
      <div className={styles.title}>Envianos un mensaje</div>
      <TextField
        placeholder={'mensaje'}
        name={'mensaje'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant={'primary'} fill onClick={() => onSendMessage(message)}>
        Contactar
      </Button>
    </div>
  )
}
