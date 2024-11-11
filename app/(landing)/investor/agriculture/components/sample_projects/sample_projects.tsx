
import React from 'react';
import styles from './sample_projects.module.scss';
import ProjectCard from "@/components/projectCard/projectCard";
import {Project, ProjectData} from "@/types/api";
export default function SampleProjects() {
    const defaultProject: ProjectData = {
        id: 1,
        name: "Cultivo de Soja en Córdoba",
        amountNeed: 100000,
        amountCollected: 30000,
        minAmount: 1000,
        startDate: "2024-12-12",
        endDate: "2025-12-12",
        startFarming: "2025-12-13",
        endFarming: "2026-12-12",
        status: "APPROVED",
        addressId: 123,
        description: "Proyecto de cultivo de soja en 50 hectáreas con prácticas agrícolas sostenibles.",
        providers: [
            { name: "AgroSistemas", seed: "soja" },
            { name: "BioTec", seed: "maíz" },
        ],
        cost:{
            commercializationExpenses: 171.11111111111111,
            plowing: 77,
            seeds: 63,
            agrochemicalsFertilizers: 220,
            harvest: 79,
            lease: 295.8
        },

        country: "Argentina",
        city: "Córdoba",
        zipCode: "5000",
        state: "Córdoba",
        area: 50, // Hectáreas
        latitude: "-31.4201",
        longitude: "-64.1888"
    }

    return (
        <section className={styles.container}>

            <div className={styles.screenDivision}>
                <div className={styles.leftHandSide}>
                    <div className={styles.projects}>
                        <ProjectCard project={defaultProject} bgColor={"#f0f0e3"} border={"None"} />
                        <ProjectCard project={defaultProject} bgColor={"#f0f0e3"}/>
                    </div>
                </div>
                <div className={styles.rightHandSide}>
                    <h2 className={styles.heading}>Comenzá a invertir con nosotros</h2>
                    <p className={styles.description}>
                        Consultá nuestras últimas propuestas de inversión en el sector agropecuario.
                    </p>
                </div>
            </div>

        </section>
    );
};

