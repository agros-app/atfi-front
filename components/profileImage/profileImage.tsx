import React from 'react';
import styles from './profileImage.module.scss';

type ProfileImageProps = {
    icon: string;
    size: number; // size in pixels
}

export default function ProfileImage({
     icon,
     size
    }: ProfileImageProps) {
    return (
        <div className={styles.iconContainer} style={{ width: size, height: size, borderRadius: size / 2 }}>
            <img src={icon} alt="Profile Icon" className={styles.iconImage}/>
        </div>
    );
}

