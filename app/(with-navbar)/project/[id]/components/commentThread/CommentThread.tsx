import ProfileImage from '@/components/profileImage/profileImage'
import styles from './CommentThread.module.scss'
import { ProjectMessage } from '@/types/api'
import Button from '@/components/button/button'

interface Props {
  message: ProjectMessage
  handleReply?: (comment: ProjectMessage) => void
}

export default function CommentThread({ message, handleReply }: Props) {
  return (
    <article className={styles.commentContainer}>
      <div className={styles.comment}>
        <div className={styles.comment}>
          <ProfileImage src={message.user.photoURL} size={20} />
          <p style={{ fontWeight: '500' }} className={styles.pad}>
            {message.message}
          </p>
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
            <svg width="20" height="20" viewBox='0 0 100 150' xmlns="http://www.w3.org/2000/svg">
              <line
                x1="10"
                y1="10"
                x2="10"
                y2="90"
                stroke="black"
                stroke-width="5"
              />
              <line
                x1="10"
                y1="90"
                x2="90"
                y2="90"
                stroke="black"
                stroke-width="5"
              />
            </svg>
            <p className={styles.pad}>{message.answer}</p>
          </div>
        </article>
      )}
    </article>
  )
}
