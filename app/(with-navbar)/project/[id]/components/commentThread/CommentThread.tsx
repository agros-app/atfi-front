import ProfileImage from '@/components/profileImage/profileImage'
import styles from './CommentThread.module.scss'
import { ProjectMessage } from '@/types/api'
import Button from '@/components/button/button'
import ReplyIcon from '@/assets/icons/reply'
import { useState } from 'react'
import ContactForm from '../contactForm/contactForm'
import BlockIcon from '@/assets/icons/block'
import { removeMessage } from '@/lib/api'
import toast from 'react-hot-toast'

interface Props {
  incomingMessage: ProjectMessage
  handleBlock: (messageId: number) => void

  canReply: boolean
}

export default function CommentThread({
  incomingMessage,
  handleBlock,
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
        <div className={styles.wrapper}>
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
              <span style={{ fontWeight: '400' }}>{message.message}</span>
            </div>
            <div className={styles.actions}>
              {canReply && !message.answer && (
                <ReplyIcon onClick={() => setOpenReply(!openReply)} />
              )}
              {canReply && (
                <BlockIcon
                  onClick={() => handleBlock(message.id)}
                  className={styles.block}
                />
              )}
            </div>
          </div>
        </div>
        {message.answer && (
          <div className={styles.answer}>{message.answer}</div>
        )}
      </article>
      {canReply && !alreadyAnswered && openReply && (
        <ContactForm replyId={message.id} onSuccess={handleMessageReply} />
      )}
    </>
  )
}
