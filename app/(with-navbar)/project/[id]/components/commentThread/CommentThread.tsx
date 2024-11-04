import ProfileImage from '@/components/profileImage/profileImage'
import styles from './CommentThread.module.scss'
import { ProjectMessage } from '@/types/api'
import ReplyIcon from '@/assets/icons/reply'
import { useState } from 'react'
import ContactForm from '../contactForm/contactForm'
import BlockIcon from '@/assets/icons/block'
import { answerMessage, editMessage } from '@/lib/api'
import EditIcon from '@/assets/icons/edit'

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
  const [openReply, setOpenReply] = useState<boolean>(false)
  const [reply, setReply] = useState<string>('')

  const handleMessageReply = async (input: string) => {
    const newMessage = message.answer
      ? await editMessage(message.id, input)
      : await answerMessage(message.id, input)

    setMessage(newMessage)
    setOpenReply(false)
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
          <div className={styles.answer}>
            <span>{message.answer}</span>
            {canReply && (
              <EditIcon
                onClick={() => {
                  setOpenReply(!openReply)
                  setReply(message?.answer ?? '')
                }}
              />
            )}
          </div>
        )}
      </article>
      {openReply && (
        <ContactForm
          replyId={message.id}
          defaultValue={reply}
          onSendMessage={handleMessageReply}
        />
      )}
    </>
  )
}
