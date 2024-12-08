"use client";

import Button from "@/components/button/button";
import React, { useState } from 'react';
import styles from './submit-project.module.scss';
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import { ProjectInfoForm } from "@/app/(with-navbar)/submit-project/components/ProyectInfoForm";
import { ProjectLocationForm } from "@/app/(with-navbar)/submit-project/components/ProjectLocationForm";
import { ProjectDetailsForm } from "@/app/(with-navbar)/submit-project/components/ProjectDetailsForm";
import {createProject, deleteProject} from "@/lib/api";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {isStepValid, validateStep} from "@/utils/validation";
import UseLending from "@/hooks/useLending";
import useLending from "@/hooks/useLending";

export type ProjectFormData = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startFarming: string;
    endFarming: string;
    returnsDate: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    area: number;
    minAmount: number;
    amountNeed: number;
    // providers: ProviderDTO[];
};

export type ProviderDTO = {
    name: string;
    seed: string;
}

const INITIAL_DATA: ProjectFormData = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startFarming: "",
    endFarming: "",
    returnsDate: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    area: 0,
    minAmount: 0,
    amountNeed: 0,
    // providers: []
};

type StepIndicatorProps = {
    currentStep: number;
    totalSteps: number;
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




export default function ProjectForm() {
    const [data, setData] = useState(INITIAL_DATA);
    const router = useRouter();
    const [errors, setErrors] = useState<Partial<ProjectFormData>>({});
    const { proposeLending } = useLending(); // TODO Arreglar esto

    function updateFields(fields: Partial<ProjectFormData>) {
        setData((prev) => ({
            ...prev,
            ...fields,
        }));
    }

    // Calculo que acá, hacer createProject(data).then(() -> createContract().then(() -> succes toast
    async function handleResponse(data: ProjectFormData, router: AppRouterInstance) {
        let projectID: number |null = null;
        try {
            // Validación previa
            if (!data.amountNeed || !data.minAmount || !data.endDate || !data.endFarming || !data.name) {
                toast.error("Datos incompletos para la propuesta de lending.");
                return;
            }

            // Proponer el lending en el contrato
            const producerAddress = "0xProducerAddress"; // Reemplaza con la lógica adecuada
            console.log("proposing lending");
            // Crear el proyecto en el backend
            const created = await createProject(data);
            projectID = created.id;
            await proposeLending(
                data.amountNeed.toString(),
                data.minAmount.toString(),
                new Date(data.endDate).getTime(), // Asegúrate de usar timestamp UNIX
                new Date(data.endFarming).getTime(),
                data.name,
                "0xBFa52102262966aF3939455E89Dac545fD855d10" // TODO: ESTO ESTÁ HARDCODEADO
            )

            toast.success(
                "El proyecto ha sido creado exitosamente, " +
                "recibirá un correo de confirmación en los próximos días",
                { duration: 3000 }
            );

            // Redirigir al home
            router.push("/home");

        } catch (error) {
            router.push("/submit-project");
            if(projectID)
                await deleteProject(projectID);
            console.error("Error en handleResponse:", error);
            toast.error("Ha ocurrido un error. Por favor, intente nuevamente.");
        }
    }

    const steps = [
        <ProjectInfoForm {...data} updateFields={updateFields} key="step1" errors={errors}/>,
        <ProjectLocationForm {...data} updateFields={updateFields} key="step2" errors={errors} />,
        <ProjectDetailsForm {...data} updateFields={updateFields} key="step3" errors={errors} />
    ];

    const { currentStep, next, back, isFirstStep, isLastStep } = useMultistepForm(steps);


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const stepErrors = validateStep(currentStep, data);
        setErrors(stepErrors);
        if (isStepValid(stepErrors)) {
            if (isLastStep) {
                const input : ProjectFormData = {...data,
                    startDate: new Date(data.startDate).toISOString(),
                    endDate: new Date(data.endDate).toISOString(),
                    startFarming: new Date(data.startFarming).toISOString(),
                    endFarming: new Date(data.endFarming).toISOString(),
                    returnsDate: new Date(data.returnsDate).toISOString(),
                };
                await handleResponse(input, router);
            } else {
                next();
            }
        }
    }

    return (
        <div className={styles.pageContainer}>
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
            <form onSubmit={onSubmit}>
                <div className={styles.formContainer}>
                    <div className={styles.forms}>
                        {steps[currentStep]}
                        <div className={styles.navigationButtons}>
                            {!isFirstStep && (
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    back();
                                }} className={styles.buttonContainer}>
                                    Atrás
                                </Button>
                            )}

                            {!isLastStep && (<Button className={styles.buttonContainer}>
                                Continuar
                            </Button>)}

                            {isLastStep && (
                                <Button className={styles.buttonContainer}>
                                    Finalizar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}