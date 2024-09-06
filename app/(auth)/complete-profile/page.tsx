"use client";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import styles from "./complete_profile.module.scss";
import TextField from "@/components/textField/textField";
import Select from "@/components/select/Select";
import Button from "@/components/button/button";
import { FormEventHandler, useState } from "react";
import { CompleteUserInfo } from "@/types/api";
import {completeUserInfo} from "@/lib/api";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function CompleteProfilePage() {
  const options = [
    { value: "Argentina", title: "🇦🇷 Argentina" },
    { value: "Uruguay", title: "🇺🇾 Uruguay" },
    { value: "Chile", title: "🇨🇱 Chile" },
    { value: "Brasil", title: "🇧🇷 Brasil" },
  ];

  const router= useRouter();

  const [formData, setFormData] = useState<CompleteUserInfo>({
    name: '',
    lastName: '',
    cuit: '',
    phone: '',
    country: ''
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      await completeUserInfo(formData);
      toast.success('User info submitted successfully!');
      router.push('/home');
    } catch (error) {
      console.log(error)
      toast.error('Error submitting user info.');
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
              type="number"
              onChange={handleInputChange}
          />
          <TextField
              placeholder="🇦🇷 +54"
              name="phone"
              label="Teléfono"
              onChange={handleInputChange}
          />
          <Select
              placeholder="Seleccioná tu país"
              name="country"
              options={options}
              label="País"
              onChange={handleInputChange}
          />
          <Button className={styles.buttonContainer} >Continuar</Button>
        </form>
      </div>
  );
}