import Logo from '@/assets/icons/logo'
import Link from 'next/link'
import styles from './navbar.module.scss'

export default function AgricultureNavBar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Logo />
      </Link>
    </nav>
  )
}

