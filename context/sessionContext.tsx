'use client'
import { User } from '@/types/api'
import { createContext, useState } from 'react'

type ProviderProps = {
  children: React.ReactNode
  session: {
    tokenData: {
      uid: string
      displayName: string
      email: string
      photoURL: string
    } | null,
    userData: User | null
  }
}

export type SessionContext = {
  tokenData: {
    uid: string
    displayName: string
    email: string
    photoURL: string
  } | null,
  userData: User | null,
  setUserData: (userData: User | null) => void
}

export const sessionContext = createContext<SessionContext | null>(null)

const SessionProvider = ({ children, session }: ProviderProps) => {
  const [userData, setUserData] = useState<User | null>(session.userData)
  return (
    <sessionContext.Provider value={{...session, userData: userData, setUserData}}>
      {children}
    </sessionContext.Provider>
  )
}

export default SessionProvider
