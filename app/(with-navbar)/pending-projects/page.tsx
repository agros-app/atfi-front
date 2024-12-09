'use client'
import usePendingProjects from '@/hooks/usePendingProjects'
import styles from './page.module.scss'
import ProjectCard from '@/components/projectCard/projectCard'
import { ProjectDetailInfo, ProviderProfile } from '@/types/api'
import { useEffect, useState } from 'react'
import DetailModal from '@/app/(with-navbar)/pending-projects/components/detailModal'
import { getProjectSeeds, getProviders, updateProjectStatus } from '@/lib/api'
import { ethers } from 'ethers'
import lendingFactory from '@/contracts/lendingFactory.json'
import toast from 'react-hot-toast'
import useLending from '@/hooks/useLending'

export default function PendingProjectsPage() {
  const { projects, removeProject } = usePendingProjects()
  const [selectedProject, setSelectedProject] =
    useState<ProjectDetailInfo | null>(null)
  const { approveProject } = useLending()
  const [providers, setProviders] = useState<ProviderProfile[]>([])

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    fetchProviders()
  }, [])

  const closeModal = () => {
    setSelectedProject(null)
  }

  const handleStatusChange = async (
    newStatus: 'APPROVED' | 'REJECTED',
    provider: string
  ) => {
    const { id: projectId, proposalId } = selectedProject as ProjectDetailInfo
    const toastId = toast.loading('Actualizando estado del proyecto...')
    try {
        if (newStatus === 'REJECTED') {
        await updateProjectStatus({ projectId, status: newStatus })
        removeProject(projectId)
        closeModal()
        return toast.success(`Proyecto ${newStatus.toLowerCase()} con éxito`, {
          id: toastId
        })
      }

      await approveProject(proposalId, provider)
    } catch (error) {
      toast.error('Error al actualizar el estado del proyecto', { id: toastId })
      console.error('Error al actualizar el estado del proyecto:', error)
    }
  }

  return (
    <>
      {projects.length > 0 ? (
        <div className={styles.projects_container}>
          {projects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              buttonText={'Ver proyecto'}
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
          isOpen={selectedProject !== null}
          onClose={closeModal}
          data={selectedProject}
          title={`${selectedProject.name || ''}`}
          onStatusChange={handleStatusChange}
          providers={providers}
        />
      )}
    </>
  )
}
