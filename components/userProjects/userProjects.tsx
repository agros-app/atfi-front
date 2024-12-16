"use client";
import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./userProjects.module.scss";
import { useEffect, useState } from "react";
import { useUserInvestments } from "@/hooks/useInvestment";
import { useRouter } from "next/navigation";
import { getProjectById } from "@/lib/api";
import {ProjectDetailInfo} from "@/types/api";

export default function UserProjects() {
    const { investments } = useUserInvestments();
    const [userProjects, setUserProjects] = useState<ProjectDetailInfo[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            if (investments.length > 0) {
                try {
                    // Fetch all projects in parallel
                    const projects = await Promise.all(
                        investments.map((investment) =>
                            getProjectById(investment.projectId)
                        )
                    );
                    setUserProjects(projects);
                } catch (error) {
                    console.error("Error fetching projects:", error);
                }
            }
        };

        fetchProjects();
    }, [investments]); // Add `investments` as a dependency

    const handleCardClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    return (
        <section>

            {userProjects.length > 0 && (
                <div>
                    <h3 className={styles.title}>Tus proyectos finalizados</h3>
                    <p>Aquí están los proyectos finalizados en los que invertiste y las ganancias fueron devueltas al contrato.</p>
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
            )}
        </section>
    );
}
