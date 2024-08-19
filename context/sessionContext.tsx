'use client'
import { createContext } from 'react'

type ProviderProps = {
  children: React.ReactNode
  session: any
}

export type SessionContext = {
  uid: string
  displayName: string
  email: string
  photoURL: string
}

export const sessionContext = createContext<SessionContext | null>(null)

const SessionProvider = ({ children, session }: ProviderProps) => {
  return (
    <sessionContext.Provider value={session}>
      {children}
    </sessionContext.Provider>
  )
}

export default SessionProvider
