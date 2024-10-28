import styles from './contactForm.module.scss'
import TextField from '@/components/textField/textField'
import Button from '@/components/button/button'
import { ProjectMessage } from '@/types/api'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'
import { answerMessage, messageProducerByProjectId } from '@/lib/api'

interface Props {
  projectId?: number

  onSuccess: (message: ProjectMessage) => void

  replyId?: number
}

export default function ContactForm({ onSuccess, replyId, projectId }: Props) {
  const inputId = 'message'

  const onSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const message = formData.get(inputId) as string
    if (message === '') {
      toast.error('El mensaje no puede estar vacio')
    } else {
      try {
        const response = replyId
          ? await answerMessage(replyId, message)
          : await messageProducerByProjectId(projectId ?? 1, message)
        toast.success('Mensaje enviado correctamente')
        form.reset()
        onSuccess(response)
      } catch (error) {
        console.log(error)
        toast.error('Error al enviar el mensaje intentelo mas tarde nuevamente')
      }
    }
  }

  return (
    <form className={styles.container} onSubmit={onSendMessage}>
      <TextField placeholder={'Deja tu mensaje...'} name={inputId} />
      <Button variant={'primary'}>{replyId ? 'Responder' : 'Contactar'}</Button>
    </form>
  )
}
