'use client'
import Button from '../button/button'

export default function LogOutButton() {
  const logOut = async () => {
    const response = await fetch('/api/auth/sign-out')
    if (response.ok) {
      window.location.href = '/'
    }
  }
  return (
    <Button onClick={logOut} size="md">
      Cerrar sesión
    </Button>
  )
}
