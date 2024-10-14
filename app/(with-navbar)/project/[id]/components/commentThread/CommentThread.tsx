import ProfileImage from '@/components/profileImage/profileImage'
import styles from './CommentThread.module.scss'
import { ProjectMessage } from '@/types/api'
import Button from '@/components/button/button'
import ReplyIcon from '@/assets/icons/reply'
import { useState } from 'react'
import Producer from '../producer/producer'

interface Props {
  incomingMessage: ProjectMessage
  handleReply?: (comment: ProjectMessage) => void

  canReply: boolean
}

export default function CommentThread({
  incomingMessage,
  handleReply,
  canReply
}: Props) {
  const [message, setMessage] = useState<ProjectMessage>(incomingMessage)
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(message.answer !== null)
  const [openReply, setOpenReply] = useState<boolean>(false)

  const handleMessageReply = (message: ProjectMessage) => {
    setMessage(message)
    setAlreadyAnswered(true)
  }
  const profilePic = message?.user?.photoURL ?? '/placeholder.png'
  return (
    <>
      <article className={styles.commentContainer}>
        <div className={styles.comment}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div className={styles.comment}>
              <ProfileImage src={profilePic} size={20} />
              <p style={{ fontWeight: '500' }} className={styles.pad}>
                {message.message}
              </p>
            </div>
            {canReply && !message.answer && <ReplyIcon onClick={()=>setOpenReply(!openReply)} />}
          </div>

          {handleReply && (
            <div className="reply">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply(message)}
              >
                Reply
              </Button>
            </div>
          )}
        </div>
        {message.answer && (
          <article className={styles.commentContainer}>
            <div className={styles.comment}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10"
                  y1="10"
                  x2="10"
                  y2="90"
                  stroke="black"
                  strokeWidth="5"
                />
                <line
                  x1="10"
                  y1="90"
                  x2="90"
                  y2="90"
                  stroke="black"
                  strokeWidth="5"
                />
              </svg>
              <p className={styles.pad}>{message.answer}</p>
            </div>
          </article>
        )}
      </article>
      {canReply && !alreadyAnswered && openReply && (
        <Producer replyId={message.id} onSuccess={handleMessageReply} />
      )}
    </>
  )
}
