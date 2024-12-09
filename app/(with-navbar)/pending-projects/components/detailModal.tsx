import React, { useState } from 'react'
import styles from './detailModal.module.scss'

import { ProjectData, ProjectDetailInfo, ProviderProfile } from '@/types/api'
import Button from '@/components/button/button'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import TextField from '@/components/textField/textField'
import Select from '@/components/select/Select'

type EditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  data: ProjectDetailInfo
  title: string
  onStatusChange: (newStatus: 'APPROVED' | 'REJECTED', provider: string) => void
  providers: ProviderProfile[]
}

export default function DetailModal({
  isOpen,
  onClose,
  data,
  title,
  providers,
  onStatusChange
}: EditProfileModalProps) {
  const [providerSelected, setProviderSelected] = useState<string>(
    providers[0].walletAdress ?? ''
  )
  console.log(providerSelected)

  if (!isOpen) return null

  const {
    name,
    amountNeed,
    amountCollected,
    minAmount,
    startDate,
    endDate,
    status,
    description,
    country,
    city,
    zipCode,
    state,
    area,
    latitude,
    longitude,
    producerName,
    producerLastName,
    producerEmail
  } = data

  const handleStatusChange = (newStatus: 'APPROVED' | 'REJECTED') =>
    onStatusChange(newStatus, providerSelected)

  const projectInfo = [
    {
      title: 'Nombre del Proyecto',
      value: name
    },
    {
      title: 'Descripción',
      value: description
    },

    {
      title: 'Monto Mínimo',
      value: minAmount
    },
    {
      title: 'Monto Necesario',
      value: amountNeed
    },
    {
      title: 'Fecha de Inicio',
      value: format(new Date(startDate), "d 'de' MMMM 'de' yyyy", {
        locale: es
      })
    },
    {
      title: 'Fecha de Finalización',
      value: format(new Date(endDate), "d 'de' MMMM 'de' yyyy", { locale: es })
    },
    {
      title: 'Ubicación',
      value: `${city}, ${state}, ${country}, ${zipCode}`
    },
    {
      title: 'Área',
      value: `${area} m²`
    },
    {
      title: 'Latitud',
      value: latitude
    },
    {
      title: 'Longitud',
      value: longitude
    },
    {
      title: 'Productor',
      value: `${producerName} ${producerLastName}`
    },
    {
      title: 'Email del Productor',
      value: producerEmail
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <div className={styles.title}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.content}>
          {projectInfo.map((info, index) => (
            <div key={`project-info-${index}`}>
              <h4>{info.title}</h4>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
        <div className={styles.providerContainer}>
          <Select
            name="provider"
            label="Comercializadora asignada"
            options={providers.map((provider) => ({
              title: provider.name,
              value: provider.walletAdress
            }))}
            onChange={(e) => setProviderSelected(e.target.value)}
          />
        </div>
        <div className={styles.form}>
          <Button
            className={styles.buttonContainer}
            variant="primary"
            onClick={() => handleStatusChange('APPROVED')}
          >
            Aprobar
          </Button>
          <Button
            className={styles.buttonContainer}
            variant="secondary"
            onClick={() => handleStatusChange('REJECTED')}
          >
            Rechazar
          </Button>
        </div>
      </div>
    </div>
  )
}
