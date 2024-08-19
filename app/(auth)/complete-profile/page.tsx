'use client'
import Logo from '@/assets/icons/logo'
import Link from 'next/link'
import styles from './complete_profile.module.scss'
import TextField from '@/components/textField/textField'
import Select from '@/components/select/Select'
import Button from '@/components/button/button'
import { FormEventHandler } from 'react'

export default function CompleteProfilePage() {
  const options = [
    { value: 'Argentina', title: '🇦🇷 Argentina' },
    { value: 'Uruguay', title: '🇺🇾 Uruguay' },
    { value: 'Chile', title: '🇨🇱 Chile' },
    { value: 'Brasil', title: '🇧🇷 Brasil' }
  ]

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    // @ts-ignore
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <Logo size={150} />
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField placeholder="Ingresá tu nombre" name="name" label="Nombre" />
        <TextField
          placeholder="Ingresá tu apellido"
          name="surname"
          label="Apellido"
        />
        <TextField
          placeholder="Ingresá tu CUIT"
          name="cuit"
          label="CUIT"
          type="number"
        />
        <TextField
          placeholder="🇦🇷 +54"
          name="phone"
          label="Teléfono"
          type="number"
        />
        <Select
          placeholder="Seleccioná tu país"
          name="country"
          options={options}
          label="País"
        />
        <Button>Continuar</Button>
      </form>
    </div>
  )
}
