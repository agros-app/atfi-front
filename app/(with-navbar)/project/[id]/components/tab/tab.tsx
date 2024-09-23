'use client'
import { useState } from 'react'
import styles from './tab.module.scss'
import Map from '../map/map'
import Shedule from '../schedule/schedule'
import { DetailsTab } from '@/app/(with-navbar)/project/[id]/components/detailsTab/detailsTab'
import Documents from '@/app/(with-navbar)/project/[id]/components/documents/documents'
import Producer from '@/app/(with-navbar)/project/[id]/components/producer/producer'
import Stepper from '@/components/stepper/stepper'
import { ProjectDetailInfo, ProjectMessage, ProjectYieldata } from '@/types/api'
import Comercializador from '@/app/(with-navbar)/project/[id]/components/comercializador/comercializador'
import useProjectYieldata from '@/hooks/useProjectYieldata'
import CommentThread from '../commentThread/CommentThread'
type Tabs =
  | 'resumen'
  | 'ubicacion'
  | 'productor'
  | 'comercializador'
  | 'detalles'
  | 'progreso'
const tabs: Tabs[] = [
  'resumen',
  'productor',
  'comercializador',
  'ubicacion',
  'detalles',
  'progreso'
]

// Hardcoded steps for now, until we have the data from SIMA
const steps = [
  {
    title: 'Siembra de maíz',
    description: 'Se sembraron 10 hectáreas de maíz.',
    date: '01/03/2024'
  },
  {
    title: 'Aplicación de fertilizantes',
    description: 'Se aplicaron 200 kg de fertilizante NPK.',
    date: '15/03/2024'
  },
  {
    title: 'Riego',
    description:
      'Primera irrigación realizada para asegurar el crecimiento de las plantas.',
    date: '20/03/2024'
  },
  { title: 'Cosecha', description: 'Recolección del maíz.', date: '01/07/2024' }
]

export default function Tab({ data }: { data: ProjectDetailInfo }) {
  const [activeTab, setActiveTab] = useState<Tabs>('resumen')
  const [showFullText, setShowFullText] = useState(false)

  const nameToSnakeCase = (name: string) => {
    return name.replace(/\s+/g, '_').toLowerCase()
  }

  //TODO: CAMBIAR EL NOMBRE AL TENER LA API CON VALORES REALES
  const snakeCaseName = data?.name ? nameToSnakeCase(data.name) : ''
  const { yieldata } = useProjectYieldata('El_Milagro') || { yieldata: {} }
  // const { yieldata } = useProjectYieldata(String(snakeCaseName)) || { yieldata: {} };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText)
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ')
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text
  }

  const projectMessages: ProjectMessage[] = [
    {
      id: 1,
      projectId: 101,
      userId: 201,
      message: '¿Cuál es el estado del proyecto?',
      answer: 'El proyecto está en proceso de aprobación.',
      createdAt: '2024-09-23T10:00:00Z',
      project: {},
      user: {
        id: 201,
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        withProvider: false,
        photoURL: '/agriculture/imagen_campo.webp',
        role: 'Producer',
        cuit: '20304050607',
        phone: '+541234567890',
        country: 'Argentina'
      }
    },
    {
      id: 2,
      projectId: 102,
      userId: 202,
      message: '¿Cuándo comenzará la siembra?',
      answer: 'La siembra comenzará el 25/09/2024.',
      createdAt: '2024-09-22T15:30:00Z',
      project: {},
      user: {
        id: 202,
        name: 'Ana',
        lastName: 'García',
        email: 'ana.garcia@example.com',
        withProvider: true,
        photoURL: '/agriculture/imagen_campo.webp',
        role: 'Investor',
        cuit: '20305060708',
        phone: '+541234567891',
        country: 'Argentina'
      }
    },
    {
      id: 3,
      projectId: 103,
      userId: 203,
      message: '¿Qué tipo de suelo tiene el campo?',
      answer: 'El campo tiene suelo franco.',
      createdAt: '2024-09-21T11:45:00Z',
      project: {},
      user: {
        id: 203,
        name: 'Pedro',
        lastName: 'Martínez',
        email: 'pedro.martinez@example.com',
        withProvider: false,
        photoURL: '/agriculture/imagen_campo.webp',
        role: 'Producer',
        cuit: '20306070809',
        phone: '+541234567892',
        country: 'Argentina'
      }
    }
  ]

  const content: Record<Tabs, JSX.Element> = {
    resumen: (
      <div className={styles.body}>
        <p>
          {showFullText
            ? data.description
            : truncateText(data.description, 100)}
        </p>
        <h3 className={styles.bold} onClick={toggleShowFullText}>
          {showFullText ? 'Ver menos' : 'Ver más'}
        </h3>
        <div className={styles.componentContainer}>
          <Documents />
        </div>
        <div>
          <div className={styles.schedule}>
            <Shedule {...data} />
          </div>
        </div>
      </div>
    ),
    productor: (
      <div className={styles.body}>
        {projectMessages.map((message) => (
          <CommentThread message={message} />
        ))}
        <Producer {...data} />
      </div>
    ),
    comercializador: (
      <div className={styles.body}>
        <Comercializador />
      </div>
    ),
    ubicacion: (
      <div className={styles.body}>
        <Map {...data} />
      </div>
    ),
    detalles: (
      <div className={styles.body}>
        <DetailsTab yieldata={yieldata} />
      </div>
    ),
    progreso: (
      <div className={styles.body}>
        <Stepper steps={steps} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={
              tab === activeTab ? styles.selectedTitle : styles.unselectedTitle
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>
      {content[activeTab]}
    </div>
  )
}
