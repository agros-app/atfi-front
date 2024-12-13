"use client"
import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./page.module.scss"
import {useState} from "react";
import useUserProjects from "@/hooks/useUserProjects";
import {useRouter} from "next/navigation";

export default function ProducerProjects() {
    const { userProjects, loading, error } = useUserProjects();
    const router = useRouter();

    const handleCardClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    return (
            <section>
                <h3 className={styles.title}>Tus Proyectos</h3>
                {loading ? (
                    <p>Cargando proyectos...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userProjects.length > 0 ? (
                    <div>
                        <p>Aquí están tus proyectos actuales. Gestiona o revisa su progreso.</p>
                        <div className={styles.projects}>
                            {userProjects.map((project) => (
                                <ProjectCard
                                    disabled={false}
                                    project={project}
                                    key={project.id}
                                    onClick={() => handleCardClick(project.id)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No tienes proyectos registrados actualmente.</p>
                )}
            </section>
    )
}