"use client"
import usePendingProjects from "@/hooks/usePendingProjects";
import styles from "./page.module.scss";
import ProjectCard from "@/components/projectCard/projectCard";
import {ProjectDetailInfo} from "@/types/api";
import {useState} from "react";
import DetailModal from "@/app/(with-navbar)/pending-projects/components/detailModal";
import {updateProjectStatus} from "@/lib/api";
import { ethers } from 'ethers';
import lendingFactory from "@/contracts/lendingFactory.json";
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

    const handleStatusChange = async (newStatus: "APPROVED" | "REJECTED", projectId: number, proposalId?: number) => {
        const toastId = toast.loading('Actualizando estado del proyecto...');
        try {

            if (newStatus === "REJECTED") {
                await updateProjectStatus({projectId, status: newStatus});
                removeProject(projectId);
                setIsModalOpen(false);
                toast.success(`Proyecto ${newStatus.toLowerCase()} con éxito`, { id: toastId });
                return null;
            }
            
            //@ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const factory = new ethers.Contract(lendingFactory.address, lendingFactory.abi, signer);
            const transaction = await factory.approveProposal(proposalId);
            const receipt = await transaction.wait();

            if (receipt.status === 1) {
                toast.success('Proyecto aprobado con éxito', {id: toastId});
                console.log('Transaction was successful:', receipt);
                removeProject(projectId);
                setIsModalOpen(false);
            } else {
                toast.error('La transacción falló', {id: toastId});
                console.error('Transaction failed:', receipt);
            }
            return transaction;
        } catch (error) {
            toast.error("Error al actualizar el estado del proyecto", {id: toastId});
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