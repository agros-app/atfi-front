import { ProjectDetailInfo, ProjectMessage } from '@/types/api'
import { useEffect, useState } from 'react'
import CommentThread from '../commentThread/CommentThread'
import Producer from '../producer/producer'
import { getProjectMessages } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ProductorTab({ data }: { data: ProjectDetailInfo }) {
  const [messages, setMessages] = useState<ProjectMessage[]>([])

  useEffect(() => {
    getProjectMessages(data.id)
      .then((messages) => setMessages(messages))
      .catch((error) => toast.error(error.message))
  }, [])

  const handleSuccess = (message: ProjectMessage) => {
    setMessages([...messages, message])
  }

  return (
    <>
      {messages.map((message) => (
        <CommentThread key={`message-${message.id}`} message={message} />
      ))}
      <Producer onSuccess={handleSuccess} {...data} />
    </>
  )
}
