import React from 'react'
import styles from './loader.module.scss'

export default function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    )
}