import ProfileImage from '@/components/profileImage/profileImage'
import styles from './CommentThread.module.scss'
import { ProjectMessage } from '@/types/api'
import Button from '@/components/button/button'
import ReplyIcon from '@/assets/icons/reply'
import { useState } from 'react'
import ContactForm from '../contactForm/contactForm'

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
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(
    message.answer !== null
  )
  const [openReply, setOpenReply] = useState<boolean>(false)

  const handleMessageReply = (message: ProjectMessage) => {
    setMessage(message)
    setAlreadyAnswered(true)
  }

  const userProfilePicture = message?.user?.photoURL
  const profilePic =
    userProfilePicture && userProfilePicture !== ''
      ? userProfilePicture
      : '/placeholder.png'
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
              <p style={{ fontWeight: '400' }} className={styles.pad}>
                {message.message}
              </p>
            </div>
            {canReply && !message.answer && (
              <ReplyIcon onClick={() => setOpenReply(!openReply)} />
            )}
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
          <div className={styles.answer}>
            <p>{message.answer}</p>
          </div>
        )}
      </article>
      {canReply && !alreadyAnswered && openReply && (
        <ContactForm replyId={message.id} onSuccess={handleMessageReply} />
      )}
    </>
  )
}
