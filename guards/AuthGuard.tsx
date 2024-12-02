'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/loader/Loader'
import { useRouter } from 'next/navigation'
import { getToken, getUserInfo } from '@/lib/api'
import useSession from '@/hooks/useSession'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { setUserData } = useSession()

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      setIsAuthenticated(!!token)
      if (token){
        const userData = await getUserInfo()
        setUserData(userData)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return <>{children}</>
}

export default AuthGuard
