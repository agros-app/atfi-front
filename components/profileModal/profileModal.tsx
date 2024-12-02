import styles from './profileModal.module.scss'
import ProfileImage from '@/components/profileImage/profileImage'
import { useWeb3 } from '@/context/web3Modal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from '@/types/api'
import ExitIcon from '@/assets/icons/exitIcon'
import ControlsIcon from '@/assets/icons/controls'
import WalletIcon from '@/assets/icons/wallet'
import { useState, useEffect } from 'react'
import useSession from '@/hooks/useSession'

type ProfileModalProps = {
  closeModal: () => void
  user: User
}

export default function ProfileModal({ closeModal }: ProfileModalProps) {
  const { userData: user } = useSession()
  const router = useRouter()
  const { connectWallet, disconnectWallet, isConnected, walletAddress } =
    useWeb3()

  const handleWallet = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }

  const logOut = async () => {
    await fetch('/api/auth/sign-out')
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.profile}>
          <div className={styles.data}>
            <h3
              className={styles.title}
            >{`${user?.name} ${user?.lastName}`}</h3>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className={styles.innerContainer}>
        {/*THE LINK IS HARDCODED*/}
        <Link href="/profile" className={styles.row} onClick={closeModal}>
          <ControlsIcon />
          <p className={styles.text}>Configuración</p>
        </Link>
        {user?.walletDisplayable && <div className={styles.row} onClick={handleWallet}>
          {isConnected ? (
            <p className={styles.text}> Desconectar {walletAddress}</p>
          ) : (
            <>
              <WalletIcon />
              <p className={styles.text}>Tus billeteras</p>
            </>
          )}
        </div>}
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.row} onClick={logOut}>
          <ExitIcon />
          <p className={styles.redText}>Salir</p>
        </div>
      </div>
    </div>
  )
}
