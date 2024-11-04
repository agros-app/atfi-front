"use client"
import usePendingProjects from "@/hooks/usePendingProjects";
import styles from "./page.module.scss";
import ProjectCard from "@/components/projectCard/projectCard";
import {ProjectDetailInfo} from "@/types/api";
import {useState} from "react";
import DetailModal from "@/app/(with-navbar)/pending-projects/components/detailModal";
import {updateProjectStatus} from "@/lib/api";
import toast from "react-hot-toast";

export default function PendingProjectsPage(){
    const { projects, removeProject } = usePendingProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectDetailInfo | null>(null);

    const handleCardClick = (project: ProjectDetailInfo) => {
        console.log(project)
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleStatusChange = async (newStatus: "APPROVED" | "REJECTED", projectId: number) => {
        try {
            await updateProjectStatus({ projectId: projectId, status: newStatus });
            removeProject(projectId); // Remueve el proyecto de la lista tras actualizar el estado
            setIsModalOpen(false);
            toast.success(`Proyecto ${newStatus.toLowerCase()} con éxito`);
        } catch (error) {
            console.error("Error al actualizar el estado del proyecto:", error);
        }
    };

    return (
        <>
            {projects.length > 0 ? (
                <div className={styles.projects_container}>
                    {projects.map((project) => (
                        <ProjectCard
                            project={project}
                            key={project.id}
                            onClick={() => handleCardClick(project)}
                            buttonText={"Ver proyecto"}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.centeredMessageContainer}>
                    <h1>No hay proyectos pendientes.</h1>
                </div>
            )}
            {selectedProject && (
                <DetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    data={selectedProject}
                    title={`${selectedProject.name || ''}`}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    );
}