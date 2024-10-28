import styles from './contactForm.module.scss'
import TextField from '@/components/textField/textField'
import Button from '@/components/button/button'
import { ProjectMessage } from '@/types/api'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'
import { answerMessage, messageProducerByProjectId } from '@/lib/api'

interface Props {
  projectId?: number

  onSendMessage: (message: string) => void

  replyId?: number

  defaultValue?: string
}

export default function ContactForm({
  onSendMessage,
  replyId,
  defaultValue
}: Props) {
  const inputId = 'message'

  const handleMessageSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const message = formData.get(inputId) as string
    if (message === '') {
      toast.error('El mensaje no puede estar vacio')
    } else {
      try {
        onSendMessage(message)
        toast.success('Mensaje enviado correctamente')
        form.reset()
      } catch (error) {
        console.log(error)
        toast.error('Error al enviar el mensaje intentelo mas tarde nuevamente')
      }
    }
  }

  return (
    <form className={styles.container} onSubmit={handleMessageSend}>
      <TextField
        placeholder={'Deja tu mensaje...'}
        name={inputId}
        // @ts-ignore
        defaultValue={defaultValue ?? ''}
      />
      <Button variant={'primary'}>{replyId ? 'Responder' : 'Contactar'}</Button>
    </form>
  )
}
