import React from 'react'
import styles from './profileImage.module.scss'

type ProfileImageProps = {
  src: string
  size: number // size in pixels
  grayFilter?: boolean
}

export default function ProfileImage({
  src,
  size,
  grayFilter = false
}: ProfileImageProps) {
  return (
    <div
      className={styles.iconContainer}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        filter: grayFilter ? 'grayscale(100%)' : 'none'
      }}
    >
      <img src={src} alt="Profile Icon" className={styles.iconImage} />
    </div>
  )
}
