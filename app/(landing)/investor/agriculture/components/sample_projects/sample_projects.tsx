
import React from 'react';
import styles from './sample_projects.module.scss';
import ProjectCard from "@/components/projectCard/projectCard";
import {Project} from "@/types/api";
export default function SampleProjects() {
    const defaultProject:Project = {
        addressId: 0,
        amountCollected: 30000,
        amountNeed:100000,
        description:"",
        endDate: "2025-12-12",
        id: 0,
        minAmount: 1000,
        name: "Cultivo de Soja",
        seeds: ["soja"],
        startDate: "2024-12-12",
        status: "APPROVED"
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Comenzá a invertir con nosotros</h2>
            <div className={styles.screenDivision}>
                <div className={styles.leftHandSide}>
                    <div className={styles.projects}>
                        <ProjectCard project={defaultProject} bgColor={"#f0f0e3"}/>
                        <ProjectCard project={defaultProject} bgColor={"#f0f0e3"}/>
                    </div>
                </div>
                <p className={styles.description}>
                    Consultá nuestras últimas propuestas de inversión en el sector agropecuario.
                </p>
            </div>

        </section>
    );
};

