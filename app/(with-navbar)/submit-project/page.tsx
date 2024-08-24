"use client";

import Button from "@/components/button/button";
import React, { useState } from 'react';
import styles from './submit-project.module.scss';
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import { ProjectInfoForm } from "@/app/(with-navbar)/submit-project/components/ProyectInfoForm";
import { ProjectLocationForm } from "@/app/(with-navbar)/submit-project/components/ProjectLocationForm";
import { ProjectDetailsForm } from "@/app/(with-navbar)/submit-project/components/ProjectDetailsForm";
import {createProject} from "@/lib/api";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export type ProjectFormData = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    area: number;
    minAmount: number;
    amountNeed: number;
    seed: string[];
};

const INITIAL_DATA: ProjectFormData = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    area: 0,
    minAmount: 0,
    amountNeed: 0,
    seed: [],
};

async function handleResponse(data: ProjectFormData, router: AppRouterInstance) {
    await createProject(data).then(() => {
            toast.success("El proyecto ha sido creado exitosamente, " +
                "recibirá un correo de confirmación en los próximos días", {
                duration: 3000,
            });
            router.push("/home")
        }
    ).catch((_) => {
        toast.error("Ha ocurrido un error al crear el proyecto, por favor intente nuevamente")
    });
}

export default function ProjectForm() {
    const [data, setData] = useState(INITIAL_DATA);
    const router = useRouter();
    function updateFields(fields: Partial<ProjectFormData>) {
        setData((prev) => ({
            ...prev,
            ...fields,
        }));
    }

    const steps = [
        <ProjectInfoForm {...data} updateFields={updateFields} key="step1" />,
        <ProjectLocationForm {...data} updateFields={updateFields} key="step2" />,
        <ProjectDetailsForm {...data} updateFields={updateFields} key="step3" />
    ];

    const { currentStep, next, back, isFirstStep, isLastStep } = useMultistepForm(steps);


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isLastStep) {
            const input : ProjectFormData = {...data,
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString()
            };
            await handleResponse(input, router);
        } else {
            next();
        }
    }

    return (
        <div className={styles.pageContainer}>
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