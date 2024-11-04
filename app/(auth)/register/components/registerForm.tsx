"use client"
import styles from "./registerForm.module.scss";
import TextField from "@/components/textField/textField";
import Select from "@/components/select/Select";
import Button from "@/components/button/button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {validateRegister, isRegisterValid, RegisterData} from "@/utils/auth.validation";

const COUNTRY_OPTION_MAP = {
    Argentina: "🇦🇷 +54",
    Uruguay: "🇺🇾 +598",
    Chile: "🇨🇱 +56",
    Brasil: "🇧🇷 +55",
}

export default function RegisterForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Partial<RegisterData>>({});
    const [countryTextfield, setCountryTextfield] = useState(COUNTRY_OPTION_MAP["Argentina"])
    const options = [
        { value: "Argentina", title: "🇦🇷 Argentina" },
        { value: "Uruguay", title: "🇺🇾 Uruguay" },
        { value: "Chile", title: "🇨🇱 Chile" },
        { value: "Brasil", title: "🇧🇷 Brasil" },
    ];
    const [formData, setFormData] = useState({
        email: '',
        country: 'Argentina',
        phone: '',
        name: '',
        lastName: '',
        cuit: '',
        password: '',
        state:'',
        city:'',
        address:'',
    });

    useEffect(() => {
        // @ts-ignore
        setCountryTextfield(COUNTRY_OPTION_MAP[formData.country]);
    }, [formData.country]);

    const router = useRouter();

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const validationErrors = validateRegister({ ...formData, password, confirmPassword });
        if (!isRegisterValid(validationErrors)) {
            setErrors(validationErrors);
            toast.error('Por favor, corrija los errores en el formulario.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        const dataToSend = { ...formData, password };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                return;
            }
            const result = await response.json();
            document.cookie = `session=${result.token}`;
            router.push('/home');
        } catch (e) {
            toast.error('Hubo un problema con el registro.');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <TextField
                placeholder={countryTextfield}
                name="phone"
                label="Teléfono"
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
            />
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
                onChange={handleInputChange}
                error={!!errors.cuit}
                helperText={errors.cuit}
            />
            <TextField
                placeholder="Ingresá tu email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá tu Contraseña"
                name="password"
                label="Contraseña"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
            />
            <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
            />
            <Button variant="primary" size="lg" className={styles.buttonContainer}>
                Continuar
            </Button>
        </form>
    );
}