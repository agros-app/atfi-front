'use client'
import styles from './registerForm.module.scss'
import TextField from '@/components/textField/textField'
import Select from '@/components/select/Select'
import Button from '@/components/button/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function RegisterForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const options = [
    { value: 'Argentina', title: '🇦🇷 Argentina' },
    { value: 'Uruguay', title: '🇺🇾 Uruguay' },
    { value: 'Chile', title: '🇨🇱 Chile' },
    { value: 'Brasil', title: '🇧🇷 Brasil' }
  ]
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    phone: '',
    name: '',
    lastName: '',
    cuit: ''
  })
  const router = useRouter()

  const handleInputChange = (event: any) => {
    console.log(event)
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.')
      return
    }

        const dataToSend = {...formData, password};
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                const error= await response.json();
                toast.error(error.message);
                return;
            }
            const result = await response.json();
            document.cookie = `session=${result.token}`;
            router.push('/home');
        }
        catch (e) {
            toast.error('Hubo un problema con el registro.');
        }
    }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Select
        placeholder="Seleccioná tu país"
        name="country"
        options={options}
        label="País"
        onChange={handleInputChange}
      />
      <TextField
        placeholder="🇦🇷 +54"
        name="phone"
        label="Teléfono"
        onChange={handleInputChange}
      />
      <TextField
        placeholder="Ingresá tu nombre"
        name="name"
        label="Nombre"
        onChange={handleInputChange}
      />
      <TextField
        placeholder="Ingresá tu apellido"
        name="lastName"
        label="Apellido"
        onChange={handleInputChange}
      />
      <TextField
        placeholder="Ingresá tu CUIT"
        name="cuit"
        label="CUIT"
        onChange={handleInputChange}
      />
      <TextField
        placeholder="Ingresá tu email"
        name="email"
        label="Email"
        onChange={handleInputChange}
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresá tu Contraseña"
        name="password"
        label="Contraseña"
        type="password"
      />
      <TextField
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Corfirmar Contraseña"
        name="password"
        label="Contraseña"
        type="password"
      />
      <Button className={styles.buttonContainer}>Continuar</Button>
    </form>
  )
}
