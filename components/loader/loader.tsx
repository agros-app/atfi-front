import React from 'react'
import styles from './loader.module.scss'

export const Loader = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.spinner}></div>
  </div>
)
