"use client";

import Button from "@/components/button/button";
import React, { useState } from 'react';
import styles from './submit-project.module.scss';
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import { ProjectInfoForm } from "@/app/(with-navbar)/submit-project/components/ProyectInfoForm";
import { ProjectLocationForm } from "@/app/(with-navbar)/submit-project/components/ProjectLocationForm";
import { ProjectDetailsForm } from "@/app/(with-navbar)/submit-project/components/ProjectDetailsForm";

type FormData = {
    projectName: string;
    description: string;
    initialDate: string;
    endDate: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    area: number;
    minAmount: number;
    finalAmount: number;
    seedType: string[];
};

const INITIAL_DATA: FormData = {
    projectName: "",
    description: "",
    initialDate: "",
    endDate: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    area: 0,
    minAmount: 0,
    finalAmount: 0,
    seedType: [],
};

export default function ProjectForm() {
    const [data, setData] = useState(INITIAL_DATA);

    function updateFields(fields: Partial<FormData>) {
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

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isLastStep) {
            alert("Formulario enviado con éxito");
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