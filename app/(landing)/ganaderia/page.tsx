import styles from './ganaderia.module.scss'
import AgricultureNavBar from '../agriculture/components/navbar/navbar'

export default function GanaderiaPage() {
  return (
    <>
      <AgricultureNavBar />
      <main className={styles.main}>
        <h1 className={styles.h1}>Proximamente en ATFI</h1>
      </main>
    </>
  )
}
