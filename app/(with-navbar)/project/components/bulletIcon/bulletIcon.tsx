import styles from './bulletIcon.module.scss';
import React from "react";

type bulletIconProps = {
    children: React.ReactNode;
    icon: string;
    subtext?: string;
};

export default function BulletIcon({ children, icon, subtext}: bulletIconProps) {
    return (
        <div className={styles.container}>
            <img src={icon} className={styles.icon}></img>
            <div>
                <span  className={styles.text}>{children}</span>
                {subtext && <span  className={styles.subtext}>{subtext}</span>}
            </div>
        </div>
    );
}

