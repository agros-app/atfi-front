import AgricultureNavBar from '@/app/(landing)/agriculture/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import styles from '@/app/(landing)/ganaderia/ganaderia.module.scss'

export default function Page() {
  return (
    <>
      <AgricultureNavBar />
      <main className={styles.main}>
        <h1 className={styles.h1}>Proximamente en ATFI</h1>
      </main>
    </>
  )
}
