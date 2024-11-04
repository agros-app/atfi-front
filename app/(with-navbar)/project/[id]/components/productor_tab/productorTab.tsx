import { ProjectDetailInfo, ProjectMessage } from '@/types/api'
import { useEffect, useState } from 'react'
import CommentThread from '../commentThread/CommentThread'
import ContactForm from '../contactForm/contactForm'
import {
  getProjectMessages,
  messageProducerByProjectId,
  removeMessage
} from '@/lib/api'
import toast from 'react-hot-toast'
import useUserInfo from '@/hooks/useUserInfo'
import styles from './productorTab.module.scss'

export default function ProductorTab({ data }: { data: ProjectDetailInfo }) {
  const [messages, setMessages] = useState<ProjectMessage[]>([])
  const { user } = useUserInfo()
  const isProducer = user.email === data.producerEmail

  useEffect(() => {
    getProjectMessages(data.id)
      .then((messages) => setMessages(messages))
      .catch((error) => toast.error(error.message))
  }, [])

  const handleSendMessage = async (message: string) => {
    try {
      const res = await messageProducerByProjectId(data.id, message)
      setMessages([...messages, res])
    } catch (e) {
      console.log(e)
    }
  }

  const handleBlockMessage = async (messageId: number) => {
    try {
      await removeMessage(messageId)
      setMessages(messages.filter((message) => message.id !== messageId))
      toast.success('Mensaje bloqueado')
    } catch (e) {
      console.log(e)
      toast.error('Error al bloquear mensaje, pruebe mas tarde')
    }
  }

  return (
    <>
      {messages.length === 0 && (
        <div className={styles.empty}>
          <p>No hay mensajes nuevos</p>
        </div>
      )}
      {messages.map((message) => (
        <CommentThread
          key={`message-${message.id}`}
          incomingMessage={message}
          canReply={isProducer}
          handleBlock={handleBlockMessage}
        />
      ))}
      {!isProducer && (
        <ContactForm projectId={data.id} onSendMessage={handleSendMessage} />
      )}
    </>
  )
}
