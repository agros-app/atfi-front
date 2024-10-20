"use client";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./complete_profile.module.scss";
import TextField from "@/components/textField/textField";
import Select from "@/components/select/Select";
import Button from "@/components/button/button";
import { FormEventHandler, useState } from "react";
import { CompleteUserInfo } from "@/types/api";
import { completeUserInfo } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { validateCompleteUserInfo, isCompleteUserInfoValid } from "@/utils/auth.validation";

export default function CompleteProfilePage() {
  const options = [
    { value: "Argentina", title: "🇦🇷 Argentina" },
    { value: "Uruguay", title: "🇺🇾 Uruguay" },
    { value: "Chile", title: "🇨🇱 Chile" },
    { value: "Brasil", title: "🇧🇷 Brasil" },
  ];

  const router = useRouter();
  const [errors, setErrors] = useState<Partial<CompleteUserInfo>>({});
  const [formData, setFormData] = useState<CompleteUserInfo>({
    name: '',
    lastName: '',
    cuit: '',
    phone: '',
    country: '',
    state:'',
    city:'',
    address:'',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const validationErrors = validateCompleteUserInfo(formData);
    if (!isCompleteUserInfoValid(validationErrors)) {
      setErrors(validationErrors);
      toast.error('Por favor, corrija los errores en el formulario.');
      return;
    }

    try {
      await completeUserInfo(formData);
      toast.success('¡Información del usuario enviada con éxito!');
      router.push('/home');
    } catch (error) {
      console.log(error);
      toast.error('Error al enviar la información del usuario.');
    }
  };

  return (
      <div className={styles.container}>
        <Link href={"/"}>
          <Logo size={150} />
        </Link>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
              placeholder="Ingresá tu nombre"
              name="name"
              label="Nombre"
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
          />
          <TextField
              placeholder="Ingresá tu apellido"
              name="lastName"
              label="Apellido"
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
          />
          <TextField
              placeholder="Ingresá tu CUIT"
              name="cuit"
              label="CUIT"
              type="number"
              onChange={handleInputChange}
              error={!!errors.cuit}
              helperText={errors.cuit}
          />
          <TextField
              placeholder="🇦🇷 +54"
              name="phone"
              label="Teléfono"
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
          />
          <Select
              placeholder="Seleccioná tu país"
              name="country"
              options={options}
              label="País"
              onChange={handleInputChange}
              error={!!errors.country}
              helperText={errors.country}
          />
          <TextField
              placeholder="Ingresá tu provincia"
              name="state"
              label="Provincia"
              onChange={handleInputChange}
              error={!!errors.state}
              helperText={errors.state}
          />
          <TextField
              placeholder="Ingresá tu ciudad"
              name="city"
              label="Ciudad"
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
          />
          <TextField
              placeholder="Ingresá tu dirección"
              name="address"
              label="Dirección"
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
          />
          <Button className={styles.buttonContainer}>Continuar</Button>
        </form>
      </div>
  );
}