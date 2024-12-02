"use client"
import styles from "@/app/(with-navbar)/submit-project/submit-project.module.scss";
import React from "react";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import {createProducer} from "@/lib/api";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export type ProducerFormData = {
    name: string;
    lastName: string;
    walletAddress: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    address: string;
    cuit: string;
}


type StepIndicatorProps = {
    currentStep: number;
    totalSteps: number;
};


type ProducerInfoData = {
    name: string;
    lastName: string;
    walletAddress: string;
    email: string;
    password: string;
};

type ProducerDetailData= {
    phone: string;
    country: string;
    state: string;
    city: string;
    address: string;
    cuit: string;
}

type ProducerInfoProps = ProducerInfoData & {
    updateFields: (fields: Partial<ProducerInfoData>) => void;
    errors: Partial<ProducerInfoData>;
};

type ProducerDetailProps = ProducerDetailData & {
    updateFields: (fields: Partial<ProducerDetailData>) => void;
    errors: Partial<ProducerDetailData>;
};



function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className={styles.stepIndicator}>
            {Array.from({ length: totalSteps }, (_, i) => (
                <React.Fragment key={i}>
                    <div
                        className={`${styles.step} ${i <= currentStep ? styles.activeStep : ''}`}
                    >
                        {i + 1}
                    </div>
                    {i < totalSteps - 1 && <div className={styles.line} />}
                </React.Fragment>
            ))}
        </div>
    );
}


function ProducerInfoForm({
                                     name,
                                     lastName,
                                     email,
                                     password,
                                     walletAddress,
                                     updateFields,
                                     errors
                                 }: ProducerInfoProps) {

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el nombre del productor"
                name="name"
                label="Nombre del Productor"
                value={name}
                onChange={(e) => updateFields({ name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                placeholder="Ingrese el apellido del productor"
                name="lastName"
                label="Apellido del productor"
                value={lastName}
                onChange={(e) => updateFields({ lastName: e.target.value })}
                error={!!errors.lastName}
                helperText={errors.lastName}
            />
            <TextField
                placeholder="Ingrese la wallet del productor"
                name="walletAddress"
                label="Wallet asociada al productor"
                value={walletAddress}
                onChange={(e) => updateFields({ walletAddress: e.target.value })}
                error={!!errors.walletAddress}
                helperText={errors.walletAddress}
            />
            <TextField
                placeholder="Ingrese el email del productor"
                name="email"
                label="Email del productor"
                type="email"
                value={email}
                onChange={(e) => updateFields({ email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                placeholder="Ingrese la contraseña del productor"
                name="password"
                label="Contraseña del productor"
                type="password"
                value={password}
                onChange={(e) => updateFields({ password: e.target.value })}
                error={!!errors.password}
                helperText={errors.password}
            />
        </div>
    );
}

function ProducerDetailForm({
                                       phone,
                                       country,
                                       state,
                                       city,
                                       address,
                                       cuit,
                                       updateFields,
                                       errors
                                   }: ProducerDetailProps) {

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el número de teléfono del productor"
                name="phone"
                label="Número de teléfono"
                value={phone}
                onChange={(e) => updateFields({ phone: e.target.value })}
                error={!!errors.phone}
                helperText={errors.phone}
            />
            <TextField
                placeholder="Ingrese el país del productor"
                name="country"
                label="País"
                value={country}
                onChange={(e) => updateFields({ country: e.target.value })}
                error={!!errors.country}
                helperText={errors.country}
            />
            <TextField
                placeholder="Ingrese la provincia del productor"
                name="state"
                label="Provincia"
                value={state}
                onChange={(e) => updateFields({ state: e.target.value })}
                error={!!errors.state}
                helperText={errors.state}
            />
            <TextField
                placeholder="Ingrese la ciudad del productor"
                name="city"
                label="Ciudad"
                value={city}
                onChange={(e) => updateFields({ city: e.target.value })}
                error={!!errors.city}
                helperText={errors.city}
            />
            <TextField
                placeholder="Ingrese la dirección del productor"
                name="address"
                label="Dirección"
                value={address}
                onChange={(e) => updateFields({ address: e.target.value })}
                error={!!errors.address}
                helperText={errors.address}
            />
            <TextField
                placeholder="Ingrese el CUIT del productor"
                name="cuit"
                label="CUIT"
                value={cuit}
                onChange={(e) => updateFields({ cuit: e.target.value })}
                error={!!errors.cuit}
                helperText={errors.cuit}
            />
        </div>
    );
}


export default function ProducerForm() {
    const [infoData, setInfoData] = React.useState<ProducerInfoData>({
        name: "",
        lastName: "",
        walletAddress: "",
        email: "",
        password: ""
    });
    const [detailData, setDetailData] = React.useState<ProducerDetailData>({
        phone: "",
        country: "",
        state: "",
        city: "",
        address: "",
        cuit: ""
    });
    const [errors, setErrors] = React.useState<Partial<ProducerFormData>>({});
    const [currentStep, setCurrentStep] = React.useState(0);
    const router= useRouter()

    function updateInfoFields(fields: Partial<ProducerInfoData>) {
        setInfoData({ ...infoData, ...fields });
    }

    function updateDetailFields(fields: Partial<ProducerDetailData>) {
        setDetailData({ ...detailData, ...fields });
    }

    function handleNext() {
        if (currentStep === 0) {
            if (!infoData.name || !infoData.lastName || !infoData.email || !infoData.password || !infoData.walletAddress) {
                setErrors({
                    name: !infoData.name ? "El nombre es requerido" : "",
                    lastName: !infoData.lastName ? "El apellido es requerido" : "",
                    walletAddress: !infoData.walletAddress ? "La dirección de la billetera es requerida" : "",
                    email: !infoData.email ? "El email es requerido" : "",
                    password: !infoData.password ? "La contraseña es requerida" : ""
                });
                return;
            }
        } else if (currentStep === 1) {
            if (!detailData.phone || !detailData.country || !detailData.state || !detailData.city || !detailData.address || !detailData.cuit) {
                setErrors({
                    phone: !detailData.phone ? "El teléfono es requerido" : "",
                    country: !detailData.country ? "El país es requerido" : "",
                    state: !detailData.state ? "La provincia es requerida" : "",
                    city: !detailData.city ? "La ciudad es requerida" : "",
                    address: !detailData.address ? "La dirección es requerida" : "",
                    cuit: !detailData.cuit ? "El CUIT es requerido" : ""
                });
                return;
            }
        }
        setErrors({});
        setCurrentStep(currentStep + 1);
    }

    function handleBack() {
        setCurrentStep(currentStep - 1);
    }

    async function handleSubmit() {
        try {
            const producerData = { ...infoData, ...detailData };
            const response = await createProducer(producerData);
            if (response.status === 201) {
                toast.success("Productor creado exitosamente.");
                router.push("/home")
            } else {
                toast.error("Hubo un error al crear el productor.");
            }
        } catch (error) {
            toast.error("Hubo un error en el servidor.");
        }
    }

    return (
        <div className={styles.pageContainer}>
            <StepIndicator currentStep={currentStep} totalSteps={2} />
            <div className={styles.formContainer}>
                <div className={styles.forms}>
                    {currentStep === 0 && (
                        <ProducerInfoForm
                            {...infoData}
                            updateFields={updateInfoFields}
                            errors={errors}
                        />
                    )}
                    {currentStep === 1 && (
                        <ProducerDetailForm
                            {...detailData}
                            updateFields={updateDetailFields}
                            errors={errors}
                        />
                    )}
                    <div className={styles.navigationButtons}>
                        {currentStep > 0 && (
                            <Button onClick={handleBack} className={styles.buttonContainer}>
                                Atrás
                            </Button>
                        )}
                        {currentStep < 1 ? (
                            <Button onClick={handleNext} className={styles.buttonContainer}>
                                Siguiente
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} className={styles.buttonContainer}>
                                Crear Productor
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}