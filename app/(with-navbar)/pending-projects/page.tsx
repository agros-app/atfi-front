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
import { useWeb3 } from '@/context/web3Modal'

export default function PendingProjectsPage() {
  const { projects, removeProject } = usePendingProjects()
  const [selectedProject, setSelectedProject] =
    useState<ProjectDetailInfo | null>(null)
  const { approveProject } = useLending()
  const { isConnected, walletAddress } = useWeb3()
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
    providerAddress: string
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

      if (!isConnected) {
        return toast('Primero debes conectar tu wallet', {
          icon: '⚠️',
          id: toastId
        })
      }

      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', []) // Aseguramos la conexión
      const signer = provider.getSigner()

      // Verificamos la wallet conectada
      const connectedAddress = await signer.getAddress()
      console.log('Connected address:', connectedAddress)

      const factory = new ethers.Contract(
        lendingFactory.address,
        lendingFactory.abi,
        signer
      )

      // Convertimos el proposalId a BigNumber para asegurar compatibilidad
      const formattedProposalId = ethers.BigNumber.from(proposalId)

      // Preparamos la transacción con estimación de gas
      const gasEstimate = await factory.estimateGas.approveProposal(
        formattedProposalId,
        [walletAddress, providerAddress],
        providerAddress
      )

      const transaction = await factory.approveProposal(
        formattedProposalId,
        [walletAddress, providerAddress],
        providerAddress,
        {
          gasLimit: gasEstimate.mul(120).div(100) // Añadimos 20% de margen
        }
      )

      const receipt = await transaction.wait()

      if (receipt.status === 1) {
        removeProject(projectId)
        toast.success('Proyecto aprobado con éxito', { id: toastId })
        console.log('Transaction successful:', receipt)
        closeModal()
      } else {
        toast.error('La transacción falló', { id: toastId })
        console.error('Transaction failed:', receipt)
      }

      return receipt
    } catch (error: any) {
      console.error('Error detallado:', error)
      toast.error(
        error.reason || 'Error al actualizar el estado del proyecto',
        { id: toastId }
      )
      throw error
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
