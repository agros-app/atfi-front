import { useState } from 'react';
import styles from './documentCard.module.scss';

type DocumentCardProps = {
    title: string;
    description: string;
};

export default function DocumentCard({ title, description }: DocumentCardProps) {
    const [iconSrc, setIconSrc] = useState('/download_black.png');

    return (
        <div
            className={styles.documentCard}
            onMouseEnter={() => setIconSrc('/download_white.png')}
            onMouseLeave={() => setIconSrc('/download_black.png')}
        >
            <div className={styles.textContainer}>
                <h3 className={styles.title}>{title}</h3>
                <h5 className={styles.description}>{description}</h5>
            </div>
            <div className={styles.iconContainer}>
                <img
                    src={iconSrc}
                    alt="Download Icon"
                />
            </div>
        </div>
    );
}
